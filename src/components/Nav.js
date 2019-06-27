import React from "react";

import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/account">
        <h1>Account</h1>
      </Link>
      <Link to="/create">
        <h1>Create</h1>
      </Link>
    </nav>
  );
}

export default Nav;
