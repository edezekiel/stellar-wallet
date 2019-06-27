import React, { useEffect } from 'react'

import { connect } from 'react-redux';

function StellarAccount(props) {

  useEffect(() => {

  }, [props.stellar.key])

  return (
    <div>Key: {props.stellar.key}</div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  stellar: state.stellar
});

export default connect(
  mapStateToProps,
)(StellarAccount)
