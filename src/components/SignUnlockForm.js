import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import unlock from "../stellarSDK/unlock";

function SignUnlockForm(props) {
  const [unlockTx, setUnlockTx] = useState({
    destinationSecret: null,
    unlockDate: null
  });

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the parties are sigining the Unlock contract.");
    unlock(props.stellar.escrowPair, unlockTx)
  };

  return (
    <form className="stellarForm">
      <h2>Unlock Signature Contract</h2>
      <label htmlFor="destination">
        <h2>*Destination (Private Key)</h2>
      </label>
      <input
        type="text"
        name="destination"
        onChange={e =>
          setUnlockTx({ ...unlockTx, destinationSecret: e.target.value })
        }
        required
      />
      <label htmlFor="destination">
        <h2>*Unlock Date (seconds)</h2>
      </label>
      <input
        type="number"
        name="destination"
        onChange={e => setUnlockTx({ ...unlockTx, unlockDate: e.target.value })}
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

export default withRouter(connect(mapStateToProps)(SignUnlockForm));
