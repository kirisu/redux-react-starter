import React from 'react'
import { render } from 'react-dom'

import store from './store'

import Root from './domains/Root'

const app = document.createElement('div')
render(React.createElement(Root, { store }), app)
document.body.appendChild(app)
