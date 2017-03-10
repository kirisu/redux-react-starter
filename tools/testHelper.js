/* @flow */

import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../src/reducers';

global.expect = expect;

global.createStoreFrom = actions => {
  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(createSagaMiddleware())
  );
  actions.forEach(action => store.dispatch(action));
  return store;
};

global.createStateFrom = (reducer, actions) => {
  var state = reducer(undefined, { type: 'NO_SUCH_ACTION' });
  deepFreeze(state);
  actions.forEach(action => state = reducer(state, action));
  return state;
};
