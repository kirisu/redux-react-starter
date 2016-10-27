import React from 'react'
import { createDevTools } from 'redux-devtools' // eslint-disable-line import/no-extraneous-dependencies
import LogMonitor from 'redux-devtools-log-monitor' // eslint-disable-line import/no-extraneous-dependencies
import DockMonitor from 'redux-devtools-dock-monitor' // eslint-disable-line import/no-extraneous-dependencies

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible>
    <LogMonitor theme="nicinabox" />
  </DockMonitor>
);

export default DevTools
