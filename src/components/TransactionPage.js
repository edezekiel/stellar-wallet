import React from "react";

import { connect } from "react-redux";

import Layout from "./Layout";
import AccountHeader from "./AccountHeader";
import PaymentForm from "./PaymentForm";
import CreateEscrowAccountForm from "./CreateEscrowAccountForm";
import EnableMultiSigForm from "./EnableMultiSigForm";
import SignUnlockForm from "./SignUnlockForm";
import SignRecoveryForm from "./SignRecoveryForm";
import ManageSellOffer from "./ManageSellOffer";
import ManageDataTimeBound from "./ManageDataTimebound";

function TransactionPage(props) {
  return (
    <Layout>
      <AccountHeader />
      {props.stellar === null || props.stellar.secretKey === null ? null : (
        <>
          <PaymentForm />
          <CreateEscrowAccountForm />
          <EnableMultiSigForm />
          <SignUnlockForm />
          <SignRecoveryForm />
          <ManageSellOffer />
          <ManageDataTimeBound />
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
