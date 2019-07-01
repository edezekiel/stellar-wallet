import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import recovery from "../stellarSDK/recovery";

function SignRecoveryForm(props) {
  const [recoveryDate, setRecoveryDate] = useState(null);

  console.log("from the Sign Recovery Form", props.stellar);

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the Recovery contract is being signed.");
    recovery(
      props.stellar.secretKey,
      props.stellar.escrowPair,
      props.stellar.destinationSecret,
      recoveryDate
    );
  };

  return (
    <form className="stellarForm">
      <h2>Recovery Signature Contract</h2>
      <label htmlFor="destination">
        <h2>*Recovery Date (seconds)</h2>
      </label>
      <input
        type="number"
        name="destination"
        onChange={e => setRecoveryDate(e.target.value)}
        required
      />
      <button className="formSubmitButton" onClick={e => handleSubmit(e)}>
        Submit
      </button>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default withRouter(connect(mapStateToProps)(SignRecoveryForm));
