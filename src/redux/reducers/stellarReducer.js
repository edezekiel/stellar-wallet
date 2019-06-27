const initial = {
  key: null,
  tx: null,
}

export default function stellarReducer(state = initial, action) {
  switch(action.type) {
    case 'ADD_KEY':
      return {
        ...state,
        key: action.key
      }
    case 'CREATE_TX':
      return {
        ...state,
        tx: action.tx
      }
    default:
      return state
  }
}
