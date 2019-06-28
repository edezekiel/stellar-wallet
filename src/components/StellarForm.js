import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addKey } from "../redux/actions";
import { createAccount } from "../stellarSDK/createAccount";
import { createPair } from "../stellarSDK/createPair";

import Layout from "./Layout";

function StellarForm(props) {
  const [key, setKey] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.addKey(key);
      props.history.push("/account");
    }
  };

  const createStellarAccount = e => {
    e.preventDefault();
    const pair = createPair();
    props.addKey(pair.secret());
    createAccount(pair)
      .then(alert("Please Wait, your Stellar account is being created."))
      .then(resp => props.history.push("/account"));
  };

  return (
    <Layout>
      <form onSubmit={e => handleSubmit(e)} className="stellarForm">
        <label htmlFor="key">
          <h2>Enter Stellar Key</h2>
        </label>
        <textarea
          type="textarea"
          rows="2"
          name="key"
          value={key !== null ? key : undefined}
          onChange={e => setKey(e.target.value)}
          required
        />
        <button type="submit" className="formSubmitButton">Submit</button>
      </form>
      <form className="stellarForm">
        <label>
        <h2>Don't Have A Key?</h2>
        </label>
        <button
          onClick={e => createStellarAccount(e)}
          className="formSubmitButton"
        >
          Create Stellar Account
        </button>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  addKey: key => dispatch(addKey(key))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StellarForm)
);
