import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

async function getAccountDetails(secretKey) {
  try {
    const publicKey = StellarSdk.Keypair.fromSecret(secretKey).publicKey();
    const account = await server.loadAccount(publicKey);

    const balances = [];
    account.balances.forEach(balance => {
      balances.push(balance);
    });
    return balances;
  } catch (e) {
    console.log("ERROR", e);
    return e;
  }
}

export default getAccountDetails;
