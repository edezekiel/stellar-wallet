const initial = {
  secretKey: null,
  escrowPair: null,
  unlockXDR: null,
  recoveryXDR: null
}

export default function stellarReducer(state = initial, action) {
  switch(action.type) {
    case 'ADD_SECRET_KEY':
      return {
        ...state,
        secretKey: action.secretKey
      }
    case 'ADD_DESTINATION_SECRET':
      return {
        ...state,
        destinationSecret: action.destinationSecret
      }
    case 'ADD_ESCROW_PAIR':
      return {
        ...state,
        escrowPair: action.escrowPair
      }
    case 'ADD_UNLOCK_XDR':
      return {
        ...state,
        unlockXDR: action.unlockXDR
      }
    case 'ADD_RECOVERY_XDR':
      return {
        ...state,
        recoveryXDR: action.recoveryXDR
      }
    default:
      return state
  }
}
