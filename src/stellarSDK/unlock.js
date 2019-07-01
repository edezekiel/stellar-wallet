import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

export default async function unlock(escrowPair, destination) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const escrowAccount = await server.loadAccount(escrowPair.publicKey());

  const minTime = Date.now() + 300;
  const maxTime = 0;

  // Set time bounds per the stellar walkthrough.
  const timebounds = {
    minTime: minTime.toString(),
    maxTime: maxTime.toString()
  };

  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
    fee: baseFee,
    timebounds: { timebounds }
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 0, // Leveling out its weight with that of the destination account
        lowThreshold: 1,
        medThreshold: 1,
        highThreshold: 1
      })
    )

    // Eventual signer is the Destination account.
    // .addOperation(
    //   StellarSdk.Operation.setOptions({
    //     signer: {
    //       ed25519PublicKey: destination,
    //       weight: 1
    //     }
    //   })
    // )

    .setTimeout(TimeoutInfinite)
    .build();

  // Immediate signer is the Escrow account.
  transaction.sign(escrowPair);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Success! Results:", transactionResult);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
