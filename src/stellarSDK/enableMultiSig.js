import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

export default async function enableMultiSig(
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
        signer: {
          ed25519PublicKey: destination,
          weight: 1
        }
      })
    )
    // Thresholds are set to 2. This makes is so that all and any type of
    // transactions originating from the escrow account now require all
    // signatures to have a total weight of 2.
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 1, // Leveling out its weight with that of the destination account
        lowThreshold: 2,
        medThreshold: 2,
        highThreshold: 2
      })
    )
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(escrowPair);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("FN: enableMultiSig", "Success! Results:", transactionResult);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
