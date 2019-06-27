export default function stellarReducer(state = [], action) {
  switch(action.type) {
    case 'ADD_KEY':
      return [...state, action.key]
    default:
      return state
  }
}
