import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
          <h2>{props.stellar.secretKey.slice(0, 10) + "..."}</h2>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(AccountHeader);
