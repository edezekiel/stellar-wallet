import React from "react";

import Nav from "./Nav";

function Layout(props) {
  return (
    <div className="layout">
      <Nav />
      <section className="layoutBody">
        {props.children}
      </section>
    </div>
  );
}

export default Layout;
