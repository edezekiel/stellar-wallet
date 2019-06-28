export default function stellarReducer(state = null, action) {
  switch(action.type) {
    case 'ADD_SECRET_KEY':
      return {
        ...state,
        secretKey: action.secretKey
      }
    default:
      return state
  }
}
