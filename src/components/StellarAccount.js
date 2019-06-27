import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getAccountDetails from "../stellarSDK/getAccountDetails";

import Layout from "./Layout";

function StellarAccount(props) {
  const [balances, setBalances] = useState(null);

  useEffect(
    () => {
      if (props.stellar.key !== null) {
        getAccountDetails(props.stellar.key).then(resp =>
          resp.name === "Error" ? alert(resp) : setBalances(resp)
        );
      }
    },
    [props.stellar.key]
  );

  return (
    <Layout>
      <section className="stellarAccount">
        <h2>Account:</h2>
        <h4>
          {props.stellar.key !== null ? (
            props.stellar.key
          ) : (
            <h1>
              <Link to="/">Enter</Link> Your Stellar Key
            </h1>
          )}
        </h4>
        <h2>Balance:</h2>
        {balances !== null
          ? balances.map((balance, i) => (
              <div key={i}>
                Type: {balance.asset_type}, Balance: {balance.balance}
              </div>
            ))
          : null}

        <h2>Last Transaction:</h2>
        {props.stellar.tx !== null ? (
          <>
            <div>Destination: {props.stellar.tx.destination}</div>
            <div>Amount: {props.stellar.tx.amount}</div>
            <div>Memo: {props.stellar.tx.memo}</div>
            <div>Timeout: {props.stellar.tx.timeout}</div>
          </>
        ) : null}
      </section>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
