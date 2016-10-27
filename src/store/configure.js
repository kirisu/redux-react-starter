import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

export default function configureStore() {
  const initialState = {}
  return compose(applyMiddleware(thunk))(createStore)(reducers, initialState)
}
