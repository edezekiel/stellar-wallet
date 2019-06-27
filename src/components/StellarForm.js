import React, { useState } from "react";

import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { addKey } from "../redux/actions";

import Layout from "./Layout";

function StellarForm(props) {
  const [key, setKey] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      props.addKey(key);
      props.history.push("/account");
    }
  };

  return (
    <Layout>
      <form onSubmit={e => handleSubmit(e)} className="stellarForm">
        <label htmlFor="key">
          <h2>Enter Stellar Key</h2>
        </label>
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
      <section className="createKeyLink">
        Don't have a Key? <Link to="/create">Create a Stellar Key</Link>
      </section>
    </Layout>
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
  mapDispatchToProps
)(StellarForm);
