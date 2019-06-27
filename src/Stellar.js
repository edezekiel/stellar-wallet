import React, { useState } from "react";

import StellarForm from "./StellarForm";
import StellarAccount from "./StellarAccount";

function Stellar(props) {
  const [auth, setAuth] = useState(false);

  return (
    <div className="stellar">
      {auth ? <StellarAccount /> : <StellarForm setAuth={setAuth} />}
    </div>
  );
}

export default Stellar;
