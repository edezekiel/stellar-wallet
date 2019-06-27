import StellarSdk from "stellar-sdk";

export const createTransaction = tx => {
  StellarSdk.Network.useTestNetwork();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const sourceKeys = StellarSdk.Keypair.fromSecret(tx.source)
  console.log(sourceKeys)
};
