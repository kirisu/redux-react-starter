import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../src/reducers'

global.expect = expect

global.createStoreFrom = (actions) => {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
  for (var action of actions)
    store.dispatch(action)
  return store
}

global.reduceFrom = (reducer, actions) => {
  var state = reducer(undefined, { type: 'NO_SUCH_ACTION' })
  for (var action of actions)
    deepFreeze(state)
    state = reducer(state, action)
  return state
}
