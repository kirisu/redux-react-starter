/* @flow */

import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from '../App'

type Props = {
  store: Object
}

const Root = ({ store } : Props) => {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

export default Root
