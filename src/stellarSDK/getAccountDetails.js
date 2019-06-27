import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

async function getAccountDetails(publicKey) {
  const account = await server.loadAccount(publicKey);
  console.log("Balance for account: " + publicKey);
  account.balances.forEach(balance => {
    console.log("Type: ", balance.asset_type, ", Balance: ", balance.balance);
  });
}

export default getAccountDetails
