import StellarSdk from "stellar-sdk";

export default async function getTxHistory(secretKey) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);

  server.transactions()
    .forAccount(sourceKeys.publicKey())
    .call()
    .then(function (transactionResult) {
      //page 1
      return transactionResult
      console.log("Page 1", transactionResult.records);
    })
    .catch(function (err) {
      console.log(err)
    })
}
