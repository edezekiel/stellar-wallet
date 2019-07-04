import StellarSdk from "stellar-sdk";

export default async function manageDataTimebound(secretKey, data) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
  const baseFee = await server.fetchBaseFee();
  const account = await server.loadAccount(sourceKeys.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: baseFee,
    timebounds: {
      minTime: Math.floor(Date.now() / 1000).toString(),
      maxTime: (Math.floor(Date.now() / 1000) + 300).toString()
    }
  })
    .addOperation(
      StellarSdk.Operation.manageData({
        entryName: data.entryName,
        entryValue: data.entryValue
      })
    )
    .setTimeout(180)
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResultXDR = await server
      .submitTransaction(transaction)
      .toEnvelope()
      .toXDR()
      .toString("base64");
    console.log("Success! Results:", transactionResultXDR);
    return transactionXDR;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
