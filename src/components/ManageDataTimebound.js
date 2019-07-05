import React, { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import manageDataTimebound from "../stellarSDK/manageDataTimebound";

function ManageDateTimebound(props) {
  const [data, setData] = useState({ entryName: null, entryValue: null });

  const handleSubmit = e => {
    e.preventDefault();
    alert("Please wait, your Data Entry is being created.");
    manageDataTimebound(props.stellar.secretKey, data);
  };

  // The stellar function automatically sets the timebound to five minutes

  return (
    <form className="stellarForm">
      <label>
        <h2>Manage Data</h2>
      </label>
      <label htmlFor="memo">
        <h2>Entry Name</h2>
      </label>
      <input
        type="text"
        name="Entry Name"
        onChange={e => setData({ ...data, entryName: e.target.value })}
      />
      <label htmlFor="memo">
        <h2>Entry Value</h2>
      </label>
      <input
        type="text"
        name="Entry Value"
        onChange={e => setData({ ...data, entryValue: e.target.value })}
      />
      <button className="formSubmitButton" onClick={e => handleSubmit(e)}>
        Submit
      </button>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

const mapDispatchToProps = dispatch => ({
  manageDataTimebound: (secretKey, data) =>
    dispatch(manageDataTimebound(secretKey, data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageDateTimebound)
);
