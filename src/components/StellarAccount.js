import React from "react";

import { connect } from "react-redux";
import getAccountDetails from "../stellarSDK/getAccountDetails";

function StellarAccount(props) {
  if (props.stellar.key !== null) {
    getAccountDetails(props.stellar.key)
  }

  return (
    <section className="stellarAccount">
      <h1>Key:</h1>
      <p style={{ paddingTop: "20px" }}>{props.stellar.key}</p>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(StellarAccount);
