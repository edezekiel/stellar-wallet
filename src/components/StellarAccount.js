import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getAccountDetails from "../stellarSDK/getAccountDetails";

import Layout from "./Layout";
import AccountHeader from "./AccountHeader";

function StellarAccount(props) {
  const [balances, setBalances] = useState(null);

  useEffect(
    () => {
      if (props.stellar !== null && props.stellar.secretKey !== null) {
        getAccountDetails(props.stellar.secretKey).then(resp =>
          resp.name === "Error" ? alert(resp) : setBalances(resp)
        );
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
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
