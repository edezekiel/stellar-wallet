import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

// This tx returns complete control of escrow account to the origin (source).

// Transaction 4 (recovery) is for account recovery in the event that the
// target (destination) does not submit the unlock transaction. It removes the
// destination account as a signer, and resets the weights for signing
// transactions to only required its own signature. This returns complete
// control of the escrow account to the origin. Transaction 4 can only be
// submitted after the recovery date (D+T+R), and it has no expiration date.

export default async function recovery(
  secretKey,
  escrowPair,
  destinationSecret,
  recoveryDate
) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const escrowAccount = await server.loadAccount(escrowPair.publicKey());

  const destinationKeys = StellarSdk.Keypair.fromSecret(destinationSecret);

  const destinationPublicKey = await server.loadAccount(
    destinationKeys.publicKey()
  );

  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
  const sourcePublicKey = StellarSdk.Keypair.fromSecret(secretKey).publicKey();

  // Minimum time: Recovery Date (D+T+R)
  // In the unlock function, the Unlock Date is set to 1 minute in the future.
  // Here, the Recovery Date is set to 5 minutes in the future.
  // This gives the Destination a 4 minute "Recovery Period." The destination
  // can submit transaction 3 (unlock) during the Recovery Period.
  const minTime = Date.now() + parseInt(recoveryDate);
  // The maximum time is set to 0, to denote that the transaction does not have
  // an expiration date.
  const maxTime = 0;

  const timebounds = {
    minTime: minTime.toString(),
    maxTime: maxTime.toString()
  };

  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
    fee: baseFee,
    timebounds: timebounds,
    sequence: (parseInt(escrowAccount.sequence) + 1).toString()
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
          ed25519PublicKey: destinationKeys.publicKey(),
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
    // Save as an XDR string
    const transactionXDR = transaction
      .toEnvelope()
      .toXDR()
      .toString("base64");
    console.log("FN: recovery", "Success! Results:", transactionXDR);
    return transactionXDR;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
