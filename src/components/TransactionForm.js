import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createTx } from "../redux/actions";
import createTransaction from "../stellarSDK/createTransaction";

import Layout from "./Layout";

function TransactionForm(props) {
  const [tx, setTx] = useState({
    key: null,
    destination: null,
    amount: null,
    memo: null,
    timeout: null
  });

  useEffect(() => {
    setTx({...tx, key: props.stellar.key})
  }, [props.stellar.key, props.stellar.tx])

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.createTx(tx)
      createTransaction(tx)
    }
  };

  return (
    <Layout>
      {props.stellar.key !== null ? (
        <>
          <form onSubmit={e => handleSubmit(e)} className="stellarForm">
            <label><h2>Your Account: </h2><h3>{props.stellar.key}</h3></label>
            <label htmlFor="destination">
              <h2>*Destination (Key)</h2>
            </label>
            <input
              type="text"
              name="destination"
              onChange={e => setTx({...tx, destination: e.target.value})}
              required
            />
            <label htmlFor="amount">
              <h2>*Amount (Lumens)</h2>
            </label>
            <input
              type="text"
              name="amount"
              onChange={e => setTx({...tx, amount: e.target.value})}
              required
            />
            <label htmlFor="memo">
              <h2>Memo</h2>
            </label>
            <input
              type="text"
              name="memo"
              onChange={e => setTx({...tx, memo: e.target.value})}
            />
            <label htmlFor="timeout">
              <h2>Timeout</h2>
            </label>
            <input
              type="text"
              name="timeout"
              onChange={e => setTx({...tx, timeout: e.target.value})}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <h1>
          Please <Link to="/">Enter</Link> Your Stellar Key
        </h1>
      )}
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  createTx: tx => dispatch(createTx(tx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionForm);
