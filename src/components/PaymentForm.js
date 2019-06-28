import React from "react";

function PaymentForm(props) {
  return (
    <form onSubmit={e => props.createPayment(e)} className="stellarForm">
      <label>
        <h2 className="formTitle">Payment Form</h2>
      </label>
      <label htmlFor="destination">
        <h2>*Destination (Key)</h2>
      </label>
      <input
        type="text"
        name="destination"
        onChange={e => props.setTx({ ...props.tx, destination: e.target.value })}
        required
      />
      <label htmlFor="amount">
        <h2>*Amount (Lumens)</h2>
      </label>
      <input
        type="text"
        name="amount"
        onChange={e => props.setTx({ ...props.tx, amount: e.target.value })}
        required
      />
      <label htmlFor="memo">
        <h2>Memo</h2>
      </label>
      <input
        type="text"
        name="memo"
        onChange={e => props.setTx({ ...props.tx, memo: e.target.value })}
      />
      <label htmlFor="timeout">
        <h2>Timeout</h2>
      </label>
      <input
        type="text"
        name="timeout"
        onChange={e => props.setTx({ ...props.tx, timeout: e.target.value })}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PaymentForm;
