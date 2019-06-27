import { combineReducers } from "redux";

import stellarReducer from "./stellarReducer";

export default combineReducers({
  stellar: stellarReducer
});
