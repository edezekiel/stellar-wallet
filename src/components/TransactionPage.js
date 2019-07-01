import React from "react";

import { connect } from "react-redux";

import Layout from "./Layout";
import AccountHeader from './AccountHeader'
import PaymentForm from "./PaymentForm";
import CreateEscrowAccountForm from "./CreateEscrowAccountForm";
import EnableMultiSigForm from './EnableMultiSigForm'

function TransactionPage(props) {
  return (
    <Layout>
      <AccountHeader />
      {props.stellar === null || props.stellar.secretKey === null ? (
        null
      ) : (
        <>
          <PaymentForm />
          <CreateEscrowAccountForm />
          <EnableMultiSigForm />
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
