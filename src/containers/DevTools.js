// get
import {createDevTools} from 'redux-devtools'
// normal
import React from 'react'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-w">
        <LogMonitor/>
    </DockMonitor>
)
