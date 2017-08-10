// @flow
import type { Store } from '../../types/Store';

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import DevTools from './components/DevTools';
import App from '../../components/App';

type Props = {
  store: Store
};

class Root extends Component {
  props: Props;
  render() {
    const { store } = this.props;
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
        <DevTools store={store} />
      </div>
    );
  }
}

export default Root;
