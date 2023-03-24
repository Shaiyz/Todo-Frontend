import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { todoReducer } from '.'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const initialState = {
    
  }
  

const store = createStore(
  combineReducers({
    todos: todoReducer,

  }),
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
