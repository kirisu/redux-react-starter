import { createStore, compose, applyMiddleware } from 'redux'

import sagaMiddleware from '../middleware/saga'
import reducers from '../reducers'

export default function configureStore() {
  const initialState = {}
  return compose(applyMiddleware(sagaMiddleware))(createStore)(reducers, initialState)
}
