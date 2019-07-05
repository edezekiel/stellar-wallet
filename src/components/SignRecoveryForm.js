import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addRecoveryXDR } from "../redux/actions";

import recovery from "../stellarSDK/recovery";

function SignRecoveryForm(props) {
  const [recoveryDate, setRecoveryDate] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the Recovery contract is being signed.");
    recovery(
      props.stellar.secretKey,
      props.stellar.escrowPair,
      props.stellar.destinationSecret,
      recoveryDate
    )
      .then(resp => props.addRecoveryXDR(resp))
      .then(props.history.push("/account"));
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

const mapDispatchToProps = dispatch => ({
  addRecoveryXDR: recoveryXDR => dispatch(addRecoveryXDR(recoveryXDR))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignRecoveryForm)
);
