import React, { useState } from "react";

import { connect } from 'react-redux';
import { addKey } from '../redux/actions'

import StellarForm from "./StellarForm";
import StellarAccount from "./StellarAccount";

function Stellar(props) {
  const [auth, setAuth] = useState(false);

  console.log(props.stellar.key)
  
  return (
    <div className="stellar">
      {auth ? <StellarAccount /> : <StellarForm setAuth={setAuth} />}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(
  mapStateToProps,
)(Stellar)
