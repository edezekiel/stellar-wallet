import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

export default async function createEscrowAccount(
  accountSecret,
  escrowPair,
  destination
) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const escrowAccount = await server.loadAccount(escrowPair.publicKey());
  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
    fee: baseFee
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 0, // Escrow account has a weight of 0, no rights :)
        lowThreshold: 1,
        medThreshold: 2, // payment is medium threshold
        highThreshold: 2
      })
    )
    .addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: StellarSdk.Keypair.fromSecret(
            accountSecret
          ).publicKey(),
          weight: 1
        }
      })
    )
    .addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: destination,
          weight: 1
        }
      })
    )
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(escrowPair);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Success! Results:", transactionResult);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
