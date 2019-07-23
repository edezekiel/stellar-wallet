import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getPublicKey from "../stellarSDK/getPublicKey";

function AccountHeader(props) {
  return (
    <>
      {props.stellar === null || props.stellar.secretKey === null ? (
        <h1>
          Please <Link to="/">Enter</Link> Your Stellar Key.
        </h1>
      ) : (
        <>
          <h1>Your Account: </h1>
          <h3>Public Key: {getPublicKey(props.stellar.secretKey)}</h3>
          <h3>SecretKey: {props.stellar.secretKey}</h3>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(AccountHeader);
