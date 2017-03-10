import React from 'react';
import { render } from 'react-dom';

import store from './store';
import Root from './domains/Root';

import 'normalize.css';

render(
  React.createElement(Root, { store }),
  document.body.appendChild(document.createElement('div'))
);
