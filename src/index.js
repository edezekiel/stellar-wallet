import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./redux/store";

import "./index.css";
import StellarHome from "./components/StellarHome";
import StellarAccount from "./components/StellarAccount";
import TransactionPage from "./components/TransactionPage";
import EscrowPage from "./components/EscrowPage";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <Route exact path="/" component={StellarHome} />
        <Route exact path="/account" component={StellarAccount} />
        <Route exact path="/transaction" component={TransactionPage} />
        <Route exact path="/escrow" component={EscrowPage} />
      </main>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
