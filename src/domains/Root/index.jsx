import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from '../App'

const Root = ({ store }) => {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
