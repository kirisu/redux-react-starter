/* @flow */

import configureStore from './store/configure'
import rootSaga from './sagas'

const store = configureStore()
store.runSaga(rootSaga)

export default store
