import types from '../types'

export const todosReducer = (state = { todos: [], error: null ,loading:false}, action) => {
  switch (action.type) {
    case types.FETCH_TODOS_REQUEST:
      return {
        loading: true,
        todos: [],
      }
    case types.FETCH_TODOS_SUCCESS:
      return {
        loading: false,
        todos: action.payload,
      }
    case types.FETCH_TODOS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export default todosReducer
