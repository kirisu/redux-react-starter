// @flow
import type { Store } from './types/Store';

import configureStore from './store/configure';

const store: Store = configureStore();

export default store;
