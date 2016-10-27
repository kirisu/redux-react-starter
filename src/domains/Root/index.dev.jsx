import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import DevTools from './components/DevTools'
import App from '../App'

class Root extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store } = this.props
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
        <DevTools store={store} />
      </div>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Root
