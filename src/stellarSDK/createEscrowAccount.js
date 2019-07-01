import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

export default async function createEscrowAccount(secretKey) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
  const escrowPair = StellarSdk.Keypair.random();

  const account = await server.loadAccount(sourceKeys.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: baseFee
  })
    .addOperation(
      StellarSdk.Operation.createAccount({
        destination: escrowPair.publicKey(),
        startingBalance: "2.5000000"
      })
    )
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResult = await server.submitTransaction(transaction)
    console.log("Success! Results:", transactionResult, "Escrow KeyPair: ", "Escrow Secret", escrowPair.secret(), "Escrow Pair", escrowPair.publicKey());
    return escrowPair
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
