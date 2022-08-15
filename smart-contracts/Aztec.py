# Contract Address : KT1WcMzwxfZAskUYZfbFejBffRMciV2PAJDr

import smartpy as sp

class Aztec(sp.Contract):


    def __init__(self, admin, initialRate, initialDuration):

        self.init(
            admin=admin,
            collateral=sp.mutez(0),
            ledger={},
            rate=initialRate,
            duration=initialDuration,
        )

    # Admin-only entrypoints

    @sp.entry_point
    def delegate(self, public_key_hash):
  
        sp.verify(sp.sender == self.data.admin)
        sp.verify(sp.amount == sp.mutez(0))
        sp.verify(sp.sender == sp.to_address(sp.implicit_account(public_key_hash)))
        sp.set_delegate(sp.some(public_key_hash))

    @sp.entry_point
    def collateralize(self):
        sp.verify(sp.sender == self.data.admin)
        self.data.collateral += sp.amount

    @sp.entry_point
    def uncollateralize(self, amount):

        sp.verify(sp.sender == self.data.admin)
        # Explicitly fails for insufficient collateral.
        sp.verify(amount <= self.data.collateral, "insufficient collateral")
        self.data.collateral -= amount
        sp.send(sp.sender, amount)

    @sp.entry_point
    def set_offer(self, rate, duration):

        sp.verify(sp.sender == self.data.admin)
        sp.verify(sp.amount == sp.mutez(0))
        self.data.rate = rate
        self.data.duration = duration

    # Permissionless entrypoints

    @sp.entry_point
    def deposit(self, duration):
  
        sp.verify(self.data.duration <= duration)
        sp.verify(~self.data.ledger.contains(sp.sender))


        self.data.collateral += sp.amount 
        # Compute interest to be paid.
        interest = sp.split_tokens(sp.amount, self.data.rate, 100)

        self.data.ledger[sp.sender] = sp.record(
            amount=sp.amount + interest,
            due=sp.now.add_days(duration),
        )


    @sp.entry_point
    def withdraw(self):
        sp.verify(sp.amount == sp.mutez(0))
        entry = self.data.ledger[sp.sender]
        sp.verify(sp.now >= entry.due , "Deposit Not Matured")
        sp.send(sp.sender, entry.amount)
        del self.data.ledger[sp.sender]

    
if "templates" not in __name__:

    @sp.add_test(name="Aztec")
    def test():
        admin = sp.test_account("Admin")
        Bob = sp.test_account("Bob")
        voting_powers = {
            admin.public_key_hash: 0,
        }

        scenario = sp.test_scenario()
        scenario.h1("Baking Swap")

        c = Aztec(admin.address, 12, 30)
        scenario += c

        c.delegate(admin.public_key_hash).run(sender=admin, voting_powers=voting_powers)
        c.deposit(sp.int(365)).run(
        amount = sp.tez(2), sender = Bob )
        # c.withdraw().run(sender = Bob)

