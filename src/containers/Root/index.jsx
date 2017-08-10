// @flow
import type { Store } from '../../types/Store';

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import App from '../../components/App';

type Props = {
  store: Store
};

const Root = ({ store }: Props) => {
  return (
    <div key="root">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
};

export default Root;
