import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import createEscrowAccount from "../stellarSDK/createEscrowAccount";

function CreateEscrowAccountForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the Escrow Account is being created");
    createEscrowAccount(props.stellar.secretKey).then(resp =>
      props.history.push("/account")
    );
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

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateEscrowAccountForm)
);
