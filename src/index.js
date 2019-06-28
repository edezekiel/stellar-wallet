import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./redux/store";

import "./index.css";
import StellarForm from "./components/StellarForm";
import StellarAccount from "./components/StellarAccount";
import CreateStellarAccount from "./components/CreateStellarAccount";
import TransactionPage from "./components/TransactionPage";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <main>
        <Route exact path="/" component={StellarForm} />
        <Route exact path="/account" component={StellarAccount} />
        <Route exact path="/transaction" component={TransactionPage} />
        <Route exact path="/create" component={CreateStellarAccount} />
      </main>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
