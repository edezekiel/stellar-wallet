// Stellar Reducer
export const addSecretKey = secretKey => {
  return { type: "ADD_SECRET_KEY", secretKey: secretKey };
};

export const addEscrowPair = escrowPair => {
  return { type: "ADD_ESCROW_PAIR", escrowPair: escrowPair };
};
