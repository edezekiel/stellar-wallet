import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

async function getAccountDetails(key) {
  try {
    const publicKey = StellarSdk.Keypair.fromSecret(key).publicKey()
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
