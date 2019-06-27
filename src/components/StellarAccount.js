import React, { useEffect } from "react";

import { connect } from "react-redux";

function StellarAccount(props) {
  useEffect(() => {}, [props.stellar.key]);

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
