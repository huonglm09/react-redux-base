// both
import React, {Component, PropTypes} from 'react'
// get
import {Provider} from 'react-redux'
import {Router} from 'react-router'
// normal
import routes from '../routes'

const Root = ({store, history}) => (
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root
