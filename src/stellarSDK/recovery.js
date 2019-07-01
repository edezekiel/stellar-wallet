import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

// This tx returns complete control of escrow account to the origin (source).

// Transaction 4 (recovery) is for account recovery in the event that the
// target (destination) does not submit the unlock transaction. It removes the
// destination account as a signer, and resets the weights for signing
// transactions to only required its own signature. This returns complete
// control of the escrow account to the origin. Transaction 4 can only be
// submitted after the recovery date (D+T+R), and it has no expiration date.

export default async function unlock(secretKey, escrowPair, destination) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const escrowAccount = await server.loadAccount(escrowPair.publicKey());

  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
  const sourcePublicKey = StellarSdk.Keypair.fromSecret(secretKey).publicKey();

  // Minimum time: Recovery Date (D+T+R)
  // In this example, the unlock date was set to 1 minute from now.
  // So the recovery date will 5 minutes from now.
  // This gives the destination a 4 minute "Recovery Period." The destination
  // can submit transaction 3 (unlock) during the Recovery Period.
  const minTime = Date.now() + 300;
  const maxTime = 0;

  const timebounds = {
    minTime: minTime.toString(),
    maxTime: maxTime.toString()
  };

  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
    fee: baseFee,
    timebounds: { timebounds }
  })
    // Resets weight for signing to only require origin account signature.
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 0,
        lowThreshold: 1,
        medThreshold: 1,
        highThreshold: 1
      })
    )
    // Remove the destination account as a signer
    .addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: destination,
          weight: 0
        }
      })
    )

    // Add Origin as an eventual signer, and give it weight to submit the tx.
    .addOperation(
      StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: sourcePublicKey,
          weight: 1
        }
      })
    )

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
