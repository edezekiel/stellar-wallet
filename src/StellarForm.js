import React, { useState } from "react";

function StellarForm(props) {
  const [key, setKey] = useState(null);

  const handleSubmit = e => {
    if (e.checkValidity()) {
      e.preventDefault()
      props.setAuth(true)
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className="stellarForm">
      <label forHtml="key"><h2>Enter Stellar Key</h2></label>
        <input
          type="text"
          name="key"
          value={key}
          onChange={e => setKey(e.target.value)}
          required
        />
      <button type="submit">Submit</button>
    </form>
  );
}

export default StellarForm
