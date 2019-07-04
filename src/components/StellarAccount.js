import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import getAccountBalances from "../stellarSDK/getAccountBalances";
import getTxHistory from "../stellarSDK/getTxHistory";

import Layout from "./Layout";
import AccountHeader from "./AccountHeader";

function StellarAccount(props) {
  const [balances, setBalances] = useState(null);
  const [txHistory, setTxHistory] = useState(null);

  useEffect(
    () => {
      if (props.stellar !== null && props.stellar.secretKey !== null) {
        getAccountBalances(props.stellar.secretKey).then(resp =>
          resp.name === "Error" ? alert(resp) : setBalances(resp)
        );
        getTxHistory(props.stellar.secretKey);
      }
    },
    [props.stellar, txHistory]
  );

  console.log(props.stellar);

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
        <h2>Most Recent Escrow Account:</h2>
        {props.stellar !== null && props.stellar.escrowPair !== null ? (
          <div>{props.stellar.escrowPair.publicKey()}</div>
        ) : null}
      </section>

      <section className="stellarAccount">
        <h2>Most Recent Signed Unlock XDR:</h2>
        {props.stellar !== null && props.stellar.unlockXDR !== null ? (
          <div>
            <p>Copy this string:</p>
            <div>{props.stellar.unlockXDR}</div>
            <p>
              Import and sign using{" "}
              <a
                target="blank"
                href="https://www.stellar.org/laboratory/#txsigner?network=test"
              >
                Stellar Laboratory
              </a>
            </p>
          </div>
        ) : null}
      </section>

      <section className="stellarAccount">
        <h2>Most Recent Signed Recovery XDR:</h2>
        {props.stellar !== null && props.stellar.recoveryXDR !== null ? (
          <div>
            <p>Copy this string:</p>
            <div>{props.stellar.recoveryXDR}</div>
            <p>
              Import and sign using{" "}
              <a
                target="blank"
                href="https://www.stellar.org/laboratory/#txsigner?network=test"
              >
                Stellar Laboratory
              </a>
            </p>
          </div>
        ) : null}
      </section>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
