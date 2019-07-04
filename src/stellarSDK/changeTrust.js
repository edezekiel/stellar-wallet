import StellarSdk from "stellar-sdk";

export default async function changeTrust(secretKey) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
  const baseFee = await server.fetchBaseFee();
  const account = await server.loadAccount(sourceKeys.publicKey());

  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: baseFee
  })
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: new StellarSdk.Asset(
          "CRYPTICBUCK",
          "GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB"
        )
      })
    )
    .setTimeout(180)
    .build();

  transaction.sign(sourceKeys);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Success! Results:", transactionResult);
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}
