import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import getAccountDetails from "../stellarSDK/getAccountDetails";

import Layout from "./Layout";

function StellarAccount(props) {
  const [balances, setBalances] = useState(null);

  useEffect(
    () => {
      if (props.stellar.key !== null) {
        getAccountDetails(props.stellar.key).then(resp => setBalances(resp));
      }
    },
    [props.stellar.key]
  );

  return (
    <Layout>
      <section className="stellarAccount">
        <h1>Key:</h1>
        {props.stellar.key !== null && balances !== null ? (
          <section>
            <div>Balance for account: {props.stellar.key}</div>
            {balances.map((balance, i) => (
              <div key={i}>
                Type: {balance.asset_type}, Balance: {balance.balance}
              </div>
            ))}
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
