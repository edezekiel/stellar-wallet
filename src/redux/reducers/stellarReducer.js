const initial = {
  key: null
}

export default function stellarReducer(state = initial, action) {
  switch(action.type) {
    case 'ADD_KEY':
      return {
        ...state,
        key: action.key
      }
    default:
      return state
  }
}
