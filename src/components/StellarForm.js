import React, { useState } from "react";

function StellarForm(props) {
  const [key, setKey] = useState(null);

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.checkValidity()) {
      props.setAuth(true)
    }
  }

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

export default StellarForm
