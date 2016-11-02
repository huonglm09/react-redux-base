// get
import { Route, IndexRoute } from 'react-router'
// normal
import React from 'react'
import App from './containers/App'
import PageHome from './containers/PageHome'
import PageCategory from './containers/PageCategory'

const route =   <Route path="/" component={App}>
                    <IndexRoute component={PageHome} />
                    <Route path="/chuyen-muc/:category" component={PageCategory} />
                </Route>

export default route
