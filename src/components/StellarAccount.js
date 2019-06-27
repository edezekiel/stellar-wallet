import React from 'react'

import { connect } from 'react-redux';

function StellarAccount(props) {
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
