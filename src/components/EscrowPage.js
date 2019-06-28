import React from "react";

import { connect } from "react-redux";
import Layout from "./Layout";
import AccountHeader from './AccountHeader'

function EscrowPage(props) {
  console.log(props.stellar)
  return (
    <Layout>
      <AccountHeader />
      <h1>Escrow Accounts Created By You:</h1>
      <section className="stellarAccount">
        {props.stellar !== null && props.stellar.escrowPair !== null ? (
          <div>{props.stellar.escrowPair.publicKey()}</div>
        ) : null}
      </section>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(mapStateToProps)(EscrowPage);
