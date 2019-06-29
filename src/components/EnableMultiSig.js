import React, { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import enableMultiSig from "../stellarSDK/enableMultiSig";

function EnableMultiSig(props) {
  const [destination, setDestination] = useState(null)
  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, multi-sig is being enabled on your escrow account.");
    enableMultiSig(props.stellar.secretKey, props.stellar.escrowPair, destination)
      .then(props.history.push("/account"));
  };

  return (
    <form className="stellarForm">
      <label>
        <h2 className="formTitle">Enable Multi Signature on Escrow Account</h2>
      </label>
      <label htmlFor="destination">
        <h2>*Destination (Key)</h2>
      </label>
      <input
        type="text"
        name="destination"
        onChange={e => setDestination(e.target.value)}
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

export default withRouter(connect(mapStateToProps)(EnableMultiSig));
