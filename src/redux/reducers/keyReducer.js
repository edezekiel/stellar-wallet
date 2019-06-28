export default function stellarReducer(state = null, action) {
  switch(action.type) {
    case 'ADD_KEY':
      return {
        ...state,
        action.key
      }
    default:
      return state
  }
}
