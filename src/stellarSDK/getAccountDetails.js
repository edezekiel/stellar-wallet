import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

async function getAccountDetails(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    console.log("Balance for account: " + publicKey);
    const balances = [];
    account.balances.forEach(balance => {
      console.log("Type: ", balance.asset_type, ", Balance: ", balance.balance);
      balances.push(balance);
    });
    return balances;
  } catch (e) {
    console.log("ERROR", e)
    return e;
  }
}

export default getAccountDetails;
