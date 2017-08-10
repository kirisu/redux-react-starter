// @flow
import type { Store } from '../types/Store';
import type { State } from '../types/State';

import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

export default (initialState: State = {}): Store => {
  const store: Store = createStore(rootReducer, initialState);
  return store;
};
