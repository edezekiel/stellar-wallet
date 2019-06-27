import StellarSdk from "stellar-sdk";

// create a completely new and unique pair of keys
const pair = StellarSdk.Keypair.random();

export default pair
