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
      <div >
        {props.stellar.key !== null && balances !== null ? (
          <section className="stellarAccount">
            <div>Balance for account: {props.stellar.key}</div>
            {balances.map((balance, i) => (
              <div key={i}>
                Type: {balance.asset_type}, Balance: {balance.balance}
              </div>
            ))}
          </section>
        ) : (
          <h1>
            Please <Link to="/">Enter</Link> Your Stellar Key
          </h1>
        )}
      </div>
      <section>
        {props.stellar.tx !== null ? (
          <section>
            <h2>Last Transaction</h2>
            <div>Destination: {props.stellar.tx.destination}</div>
            <div>Amount: {props.stellar.tx.amount}</div>
            <div>Memo: {props.stellar.tx.memo}</div>
            <div>Timeout: {props.stellar.tx.timeout}</div>
          </section>
        ) : null}
      </section>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
