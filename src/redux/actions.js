export const addKey = key => {
  return { type: "ADD_KEY", key: key };
};

export const addTx = tx => {
  return { type: "ADD_TX", tx: tx };
};
