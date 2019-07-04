import StellarSdk from "stellar-sdk";

function getPublicKey(secret) {
  const sourceKeys = StellarSdk.Keypair.fromSecret(secret);
  let publicKey = sourceKeys.publicKey()
  return publicKey
}

export default getPublicKey;
