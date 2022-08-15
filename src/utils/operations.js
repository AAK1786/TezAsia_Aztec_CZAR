// TODO 6 - Call buy_ticket entrypoint in the Lottery contract
import { tezos } from "./tezos";
import Deposit from "../components/deposit";
import Loan from "../components/loan";
// import depositLedger from Deposit 

export const lendTez = async () => {        
  try {
    const contract = await tezos.wallet.at("KT1EGMBvfm1cREch2Fz7UYjA9bSgGVTxNLfD");
    await contract.methods.deposit
    const op = await contract.methods.deposit().send({
      amount: Deposit.depositLedger[0].amount ,
      mutez: false,
    });
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

// TODO 10 - Call end_game entrypoint in the Lottery contract
export const endGameOperation = async () => {
  try {
    const contract = await tezos.wallet.at("KT1EGMBvfm1cREch2Fz7UYjA9bSgGVTxNLfD");
    const op = await contract.methods.end_game().send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};
