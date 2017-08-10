import type { Store } from '../types/Store';
import type { State } from '../types/State';

import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

import DevTools from '../domains/Root/components/DevTools';

export default (initialState: State = {}): Store => {
  const instrument: Object = DevTools.instrument();
  const store: Store = createStore(
    rootReducer,
    initialState,
    compose(instrument)
  );

  return store;
};
