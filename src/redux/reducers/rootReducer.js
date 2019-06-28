import { combineReducers } from "redux";

import keyReducer from "./keyReducer";
import txReducer from "./txReducer";

export default combineReducers({
  key: keyReducer,
  tx: txReducer
});
