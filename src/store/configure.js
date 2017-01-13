import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer, initialState, compose(applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run
  }
}
