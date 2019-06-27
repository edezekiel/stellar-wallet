export const addKey = key => {
  return { type: "ADD_KEY", key: key };
};

export const createTx = tx => {
  return { type: "CREATE_TX", tx: tx };
};
