import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createTx } from "../redux/actions";

import createPayment from "../stellarSDK/createPayment";

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

  const createPaymentTx = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.createTx(tx);
      createPayment(tx).then(resp => props.history.push("/account"));
    }
  };

  return (
    <Layout>
      {props.stellar.key === null ? (
        <h1>
          Please <Link to="/">Enter</Link> Your Stellar Key.
        </h1>
      ) : (
        <>
          <h1>Your Account: </h1>
          <h2>{props.stellar.key.slice(0, 10) + "..."}</h2>
          <PaymentForm createPaymentTx={createPaymentTx} setTx={setTx} tx={tx} />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionPage);
