import React from "react";

import { createPair } from "../stellarSDK/createPair";
import { createAccount } from "../stellarSDK/createAccount";
import { connect } from "react-redux";
import { addKey } from "../redux/actions";
import { withRouter } from 'react-router-dom'

function CreateStellarAccount(props) {
  const handleSubmit = e => {
    e.preventDefault();
    const pair = createPair();
    addKey(pair.publicKey());
    createAccount(pair)
    props.history.push('/account')
  };

  return (
    <form className="createStellarAccount" onSubmit={e => handleSubmit(e)}>
      <button type="submit">Create Stellar Account</button>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  addKey: key => dispatch(addKey(key))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStellarAccount));
