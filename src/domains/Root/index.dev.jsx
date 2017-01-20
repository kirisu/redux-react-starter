/* @flow */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import DevTools from './components/DevTools';
import App from '../App';

type Props = {
  store: Object
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
