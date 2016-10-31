import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CategoryPage from './containers/CategoryPage'

export default <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/chuyen-muc/:category" component={CategoryPage} />
</Route>
