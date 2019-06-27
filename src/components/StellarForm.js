import React, { useState } from "react";

import { connect } from 'react-redux';
import { addKey } from '../redux/actions'

function StellarForm(props) {
  const [key, setKey] = useState(null);

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.checkValidity()) {
      props.addKey(key)
      props.setAuth(true)
    }
  }

  console.log(props.stellar)

  return (
    <form onSubmit={e => handleSubmit(e)} className="stellarForm">
      <label htmlFor="key"><h2>Enter Stellar Key</h2></label>
        <textarea
          type="textarea"
          rows="2"
          name="key"
          value={key !== null ? key : undefined}
          onChange={e => setKey(e.target.value)}
          required
        />
      <button type="submit">Submit</button>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  addKey: key => dispatch(addKey(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StellarForm)
