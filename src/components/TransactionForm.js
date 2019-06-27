import React, { useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./Layout";

function TransactionForm(props) {
  const [tx, setTx] = useState({
    source: props.stellar.key,
    destination: null,
    amount: null,
    memo: null,
    timeout: null
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.history.push("/account");
    }
  };

  const setField = (field, e) => {
    const t = { ...tx };
    t[field] = e.target.value;
  };

  return (
    <Layout>
      {props.stellar.key !== null ? (
        <>
          <form onSubmit={e => handleSubmit(e)} className="stellarForm">
            <label><h2>Your Account: </h2><h3>{props.stellar.key}</h3></label>
            <label htmlFor="destination">
              <h2>Destination</h2>
            </label>
            <input
              type="text"
              name="destination"
              onChange={e => setField("destination", e)}
              required
            />
            <label htmlFor="destination">
              <h2>Amount</h2>
            </label>
            <input
              type="text"
              name="amount"
              onChange={e => setField("amount", e)}
              required
            />
            <label htmlFor="destination">
              <h2>Memo</h2>
            </label>
            <input
              type="text"
              name="destination"
              onChange={e => setField("memo", e)}
              required
            />
            <label htmlFor="destination">
              <h2>Timeout</h2>
            </label>
            <input
              type="text"
              name="timeout"
              onChange={e => setField("timeout", e)}
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionForm);
