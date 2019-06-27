import React from "react";

import Nav from "./Nav";

function Layout(props) {
  return (
    <div className="layout">
      <Nav />
      {props.children}
    </div>
  );
}

export default Layout;
