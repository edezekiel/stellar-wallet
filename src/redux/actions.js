// Stellar Reducer
export const addSecretKey = secretKey => {
  return { type: "ADD_SECRET_KEY", secretKey: secretKey };
};

export const addDestinationSecret = destinationSecret => {
  return { type: "ADD_DESTINATION_SECRET", destinationSecret: destinationSecret };
};

export const addEscrowPair = escrowPair => {
  return { type: "ADD_ESCROW_PAIR", escrowPair: escrowPair };
};

export const addUnlockXDR = unlockXDR => {
  return { type: "ADD_UNLOCK_XDR", unlockXDR: unlockXDR };
};
