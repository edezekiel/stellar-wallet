import React from "react";

import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/account">
        <h1>Balance</h1>
      </Link>
      <Link to="/transaction">
        <h1>Transaction</h1>
      </Link>
      <Link to="/create">
        <h1>New Account</h1>
      </Link>
    </nav>
  );
}

export default Nav;
