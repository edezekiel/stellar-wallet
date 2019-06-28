import StellarSdk from "stellar-sdk";

export default async function createEscrowAccount(key) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const sourceKeys = StellarSdk.Keypair.fromSecret(key);
  const escrowPair = StellarSdk.Keypair.random();

  const transaction = new StellarSdk.TransactionBuilder(sourceKeys, {
    fee: baseFee
  })
    .addOperation(
      StellarSdk.Operation.createAccount({
        destination: escrowPair.publicKey(),
        startingBalance: "2.5000000"
      })
    )
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Success! Results:");
    return transactionsResult
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
