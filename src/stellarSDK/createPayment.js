import StellarSdk from "stellar-sdk";

export default async function createPayment(tx) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(tx.key);
  const baseFee = await server.fetchBaseFee();

  const account = await server.loadAccount(sourceKeys.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(account, { fee: baseFee })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: tx.destination,
        asset: StellarSdk.Asset.native(),
        amount: tx.amount
      })
    )
    .addMemo(StellarSdk.Memo.text(tx.memo))
    .setTimeout(180)
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Success! Results:");
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
