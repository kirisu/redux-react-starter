/* @flow */

import { expect } from 'chai'
import deepFreeze from 'deep-freeze'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../src/reducers'

global.expect = expect

global.createStoreFrom = (actions) => {
  const store = createStore(rootReducer, undefined, applyMiddleware(createSagaMiddleware()))
  for (var action of actions)
    store.dispatch(action)
  return store
}

global.createStateFrom = (reducer, actions) => {
  var state = reducer(undefined, { type: 'NO_SUCH_ACTION' })
  deepFreeze(state)
  for (var action of actions)
    state = reducer(state, action)
  return state
}
