import StellarSdk from "stellar-sdk";

export default async function getTxHistory(secretKey) {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);

  server.transactions()
    .forAccount(sourceKeys.publicKey())
    .call()
    .then(function (page) {
      console.log("Page 1: ");
      console.log(page.records);
      return page.next()
    })
    .then(function (page) {
      console.log("Page 2: ");
      console.log(page.records);
      return page.next()
    })
    .catch(function(err) {
      console.log(err)
    })
}
