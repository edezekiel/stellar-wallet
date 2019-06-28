import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./Layout";
import PaymentForm from "./PaymentForm";
import CreateEscrowAccountForm from "./CreateEscrowAccountForm";

function TransactionPage(props) {
  return (
    <Layout>
      {props.stellar === null || props.stellar.secretKey === null ? (
        <h1>
          Please <Link to="/">Enter</Link> Your Stellar Key.
        </h1>
      ) : (
        <>
          <h1>Your Account: </h1>
          <h2>{props.stellar.secretKey.slice(0, 10) + "..."}</h2>
          <PaymentForm />
          <CreateEscrowAccountForm />
        </>
      )}
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionPage);
