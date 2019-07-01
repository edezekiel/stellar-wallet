import StellarSdk, { TimeoutInfinite } from "stellar-sdk";

// This tx transfers complete control of escrow account to target (destination).

// Transaction 3 can be submitted at any time during the recovery period, R.
// If the target (destination account) does not submit Transaction 3 to enable
// access to the funds in the escrow account, the origin can submit Transaction
// 4 after the recovery date. The origin can reclaim the locked up assets if
// desired as Transaction 4 makes it so the target (destination) is no longer
// required to sign transactions for escrow account. After the recovery date,
// both Transaction 3 and Transaction 4 are valid and able to be submitted to
// the network but only one trnsaction will be accepted by the network. This is
// ensured by the feature that both transactions have the same sequence number.

// Variables
// N, M - the sequence number of escrow account and source account,
// respectively; N + 1 means the next sequence transaction number, and so on.
// T - the lock-up period
// D - the date upon which the lock-up period starts.
// R - the recovery period

export default async function unlock(escrowPair, destination) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const baseFee = await server.fetchBaseFee();
  const escrowAccount = await server.loadAccount(escrowPair.publicKey());

  // The unlock date (D+T) is the first date that the unlock transaction can be
  // submitted. If Transaction 3 (this transaction) is submitted before the
  // unlock date, the transaction will not be valid.

  // In this example, the unlock date is set to 1 minute from now.
  const minTime = Date.now() + 60;
  // The maximum time is set to 0, to denote that the transaction does not have
  // an expiration date.
  const maxTime = 0;

  const timebounds = {
    minTime: minTime.toString(),
    maxTime: maxTime.toString()
  };

  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
    fee: baseFee,
    timebounds: { timebounds },
    sequence: (parseInt(escrowAccount.sequence) + 1).toString()
  })
    .addOperation(
      StellarSdk.Operation.setOptions({
        masterWeight: 0, // Leveling out its weight with the destination account
        lowThreshold: 1,
        medThreshold: 1,
        highThreshold: 1
      })
    )

    // Eventual Signer: Destination account.
    // I.e., after the end of the lock-up time period, the only accound that is
    // needed to sign for transactions from the escrow account is the
    // destination account.
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

  // Immediate signer is the Escrow account.
  transaction.sign(escrowPair);

  try {
    // Save as an XDR string
    const transactionXDR = transaction
      .toEnvelope()
      .toXDR()
      .toString("base64");
    console.log("Success! Results:", transactionXDR);
    return transactionXDR;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}