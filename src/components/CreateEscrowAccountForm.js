import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import createEscrowAccount from "../stellarSDK/createEscrowAccount";
import { addEscrowPair } from "../redux/actions";

function CreateEscrowAccountForm(props) {

  const conditionallySetEscrowPair = (resp) => {
    if (resp !== undefined) {
      props.addEscrowPair(resp)
    } else {
      alert("Could Not Create Escrow Account.")
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the Escrow Account is being created");
    createEscrowAccount(props.stellar.secretKey)
      .then(resp => conditionallySetEscrowPair(resp))
      .then(props.history.push("/account"));
  };

  return (
    <form className="stellarForm">
      <h2>Create Escrow Account Form</h2>
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
  addEscrowPair: escrowPair => dispatch(addEscrowPair(escrowPair))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateEscrowAccountForm)
);
