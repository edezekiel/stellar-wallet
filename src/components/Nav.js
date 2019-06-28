import React from "react";

import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/account">
        <h1>My Account</h1>
      </Link>
      <Link to="/transaction">
        <h1>Transactions</h1>
      </Link>
    </nav>
  );
}

export default Nav;
