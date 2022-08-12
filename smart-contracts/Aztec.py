import smartpy as sp


class Aztec(sp.Contract):

    def __init__(self, admin):

        self.init(
            admin = sp.test_account("Admin").address ,
            collateral=sp.mutez(0),
            lend_ledger= {} ,
            # borrow_ledger = {},
            lending_rate = sp.nat(0),
            borrow_rate = sp.nat(0)

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
    def set_offer(self):
 
        sp.verify(sp.sender == self.data.admin)
        sp.verify(sp.amount == sp.mutez(0))

        self.data.lending_rate = ( sp.nat(8) + sp.as_nat(sp.now - sp.timestamp(0)) % sp.nat(5) ) // sp.nat(7)
        self.data.borrow_rate = ( sp.nat(15) + sp.as_nat(sp.now - sp.timestamp(0)) % sp.nat(5) ) // sp.nat(10)


    # Permissionless entrypoints

    @sp.entry_point
    def deposit(self):
        """Deposit tez. The current offer has to be repeated in the parameters.

        Args:
            rate (sp.TNat): Basis points to compute the interest.
            duration (sp.TNat): Number of days before a deposit can be withdrawn.
        """
        sp.verify(~self.data.lend_ledger.contains(sp.sender), "Alreade have an asset")

        # Compute interest to be paid.
        interest = sp.split_tokens(sp.amount, self.data.lending_rate, 1)
        sp.if self.data.collateral >interest :
            self.data.collateral -= interest

        newamount = sp.amount + interest

        # Record the payment to be made.
        self.data.lend_ledger[sp.sender] = sp.record(
            amount= newamount
            # due=sp.now.add_days(self.data.duration),
        )

    # @sp.entry_point
    # def withdraw(self):
    #     """Withdraw tez at maturity."""
    #     sp.verify(sp.amount == sp.mutez(0))
    #     entry = self.data.lend_ledger[sp.sender]
    #     sp.send(sp.sender, entry.amount)
    #     del self.data.lend_ledger[sp.sender]


if "templates" not in __name__:

    @sp.add_test(name="Baking")
    def test():
        aak= sp.test_account("aak")
        alice= sp.test_account("alice")

        admin = sp.test_account("Admin")

        voting_powers = {
            admin.public_key_hash: 0,
        }

        scenario = sp.test_scenario()
        scenario.h1("Baking Swap")

        bs = Aztec(admin.address)
        scenario += bs

        bs.delegate(admin.public_key_hash).run(sender=admin, voting_powers=voting_powers)

        scenario +=bs.set_offer().run(
        amount = sp.tez(0),
        sender = admin
    )
        scenario += bs.deposit().run(
        amount = sp.tez(10),
        sender = aak
    )
        scenario += bs.deposit().run(
        amount = sp.tez(10),
        sender = alice
    )

