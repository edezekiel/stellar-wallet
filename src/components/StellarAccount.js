import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getAccountDetails from "../stellarSDK/getAccountDetails";
import getTxHistory from "../stellarSDK/transactionHistory";

import Layout from "./Layout";
import AccountHeader from "./AccountHeader";

function StellarAccount(props) {
  const [balances, setBalances] = useState(null);
  const [txHistory, setTxHistory] = useState(null);

  useEffect(
    () => {
      if (props.stellar !== null && props.stellar.secretKey !== null) {
        getAccountDetails(props.stellar.secretKey).then(resp =>
          resp.name === "Error" ? alert(resp) : setBalances(resp)
        );
        getTxHistory(props.stellar.secretKey).then(resp =>
          resp.name === "Error" ? alert(resp) : setTxHistory(resp)
        );
        console.log(balances, txHistory);
      }
    },
    [props.stellar]
  );

  return (
    <Layout>
      <AccountHeader />

      <section className="stellarAccount">
        <h2>Balance:</h2>
        {balances !== null
          ? balances.map((balance, i) => (
              <div key={i}>
                Type: {balance.asset_type}, Balance: {balance.balance}
              </div>
            ))
          : null}
      </section>

      <section className="stellarAccount">
        <h2>Transaction History:</h2>
        {props.stellar !== null && props.stellar.secretKey !== null ? (
          <p>Your transaction history</p>
        ) : null}
      </section>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
