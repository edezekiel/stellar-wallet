const initial = {
  sequence: null,
  memo: null,
  timeout: null
}

export default function transactionReducer (state = initial, action) {
  switch(action.type) {
    case 'SET_SEQUENCE':
      return {
        ...state,
        sequence: action.sequence
      }
    case 'SET_MEMO':
      return {
        ...state,
        memo: action.memo
      }
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeout: action.timeout
      }
    default:
      return state
  }
}
