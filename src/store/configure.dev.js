/* @flow */

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';

import DevTools from '../domains/Root/components/DevTools';

export default (initialState : Object = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware), DevTools.instrument())),
    runSaga: sagaMiddleware.run
  };
}
