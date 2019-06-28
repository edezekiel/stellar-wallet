import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createTx } from "../redux/actions";
import createTransaction from "../stellarSDK/createTransaction";
import { createPair } from "../stellarSDK/createPair";
import { createAccount } from "../stellarSDK/createAccount";
import { addKey } from "../redux/actions";

import Layout from "./Layout";
import PaymentForm from "./PaymentForm";

function TransactionPage(props) {
  const [tx, setTx] = useState({
    key: null,
    destination: null,
    amount: null,
    memo: null,
    timeout: null
  });

  useEffect(
    () => {
      setTx({ ...tx, key: props.stellar.key });
    },
    [props.stellar.key, props.stellar.tx]
  );

  const createStellarAccount = e => {
    e.preventDefault();
    const pair = createPair();
    props.addKey(pair.secret());
  };

  const createPayment = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.createTx(tx);
      createTransaction(tx).then(props.history.push("/account"));
    }
  };

  return (
    <Layout>
      {props.stellar.key === null ? (
        <h1>
          Please <Link to="/">Enter</Link> Your Stellar Key or{" "}
          <button
            onClick={e => createStellarAccount(e)}
            className="createAccountButton"
          >
            Create Stellar Account
          </button>
        </h1>
      ) : (
        <>
          <h1>Your Account: </h1>
          <h2>{props.stellar.key.slice(0, 10) + "..."}</h2>
          <PaymentForm createPayment={createPayment} setTx={setTx} tx={tx} />
        </>
      )}
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  createTx: tx => dispatch(createTx(tx)),
  addKey: key => dispatch(addKey(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionPage);
