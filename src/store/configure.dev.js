import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

import DevTools from '../domains/Root/components/DevTools'

export default function configureStore() {
  const initialState = {}
  return compose(applyMiddleware(thunk), DevTools.instrument())(createStore)(reducers, initialState)
}
