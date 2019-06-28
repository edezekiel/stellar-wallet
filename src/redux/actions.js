// Stellar Reducer
export const addSecretKey = secretKey => {
  return { type: "ADD_SECRET_KEY", secretKey: secretKey };
};
