import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import manageSellOffer from "../stellarSDK/manageSellOffer";

function ManageSellOffer(props) {

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, the Sell Offer is being created.");
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
    manageSellOffer(props.stellar.secretKey)
  };

  return (
    <form className="stellarForm">
      <h2>Manage Sell Offer</h2>
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
  manageSellOffer: secretKey => dispatch(manageSellOffer(secretKey))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageSellOffer)
);
