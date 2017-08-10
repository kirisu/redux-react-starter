// @flow

import deepFreeze from 'deep-freeze';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers';

global.createStoreFrom = actions => {
  const store = createStore(rootReducer, undefined);
  actions.forEach(action => store.dispatch(action));
  return store;
};

global.createStateFrom = (reducer, actions) => {
  var state = reducer(undefined, { type: 'NO_SUCH_ACTION' });
  deepFreeze(state);
  actions.forEach(action => (state = reducer(state, action)));
  return state;
};
