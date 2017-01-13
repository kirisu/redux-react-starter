import { createStore, compose, applyMiddleware } from 'redux'

import sagaMiddleware from '../middleware/saga'
import reducers from '../reducers'

import DevTools from '../domains/Root/components/DevTools'

export default function configureStore() {
  const initialState = {}
  return compose(applyMiddleware(sagaMiddleware), DevTools.instrument())(createStore)(reducers, initialState)
}
