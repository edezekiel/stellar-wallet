import StellarSdk from "stellar-sdk";

export const createPair = () => {
  const pair = StellarSdk.Keypair.random()
  return pair
}
