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
        name: data.entryName,
        value: data.entryValue
      })
    )
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    // console.log("Success! Results:", transactionResult);
    // return transactionResult;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
