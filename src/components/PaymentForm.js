import React, { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import createPayment from "../stellarSDK/createPayment";

function PaymentForm(props) {
  const [paymentTx, setPaymentTx] = useState({
    destination: null,
    amount: null,
    memo: null,
    timeout: null
  });

  const createPaymentTX = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      createPayment(props.stellar.secretKey, paymentTx).then(resp =>
        props.history.push("/account")
      );
    }
  };

  return (
    <form onSubmit={e => createPaymentTX(e)} className="stellarForm">
      <label>
        <h2 className="formTitle">Simple Payment</h2>
      </label>
      <label htmlFor="destination">
        <h2>*Destination (Public Key)</h2>
      </label>
      <input
        type="text"
        name="destination"
        onChange={e =>
          setPaymentTx({ ...paymentTx, destination: e.target.value })
        }
        required
      />
      <label htmlFor="amount">
        <h2>*Amount (Lumens)</h2>
      </label>
      <input
        type="text"
        name="amount"
        onChange={e => setPaymentTx({ ...paymentTx, amount: e.target.value })}
        required
      />
      <label htmlFor="memo">
        <h2>Memo</h2>
      </label>
      <input
        type="text"
        name="memo"
        onChange={e => setPaymentTx({ ...paymentTx, memo: e.target.value })}
      />
      <label htmlFor="timeout">
        <h2>Timeout</h2>
      </label>
      <input
        type="text"
        name="timeout"
        onChange={e => setPaymentTx({ ...paymentTx, timeout: e.target.value })}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default withRouter(connect(mapStateToProps)(PaymentForm));
