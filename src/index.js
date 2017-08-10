import React from 'react';
import { render } from 'react-dom';
import store from './store';
import Root from './containers/Root';

const body = document.body;

render(<Root store={store} />, body.appendChild(document.createElement('div')));
