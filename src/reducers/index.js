// both
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
// normal
import reducerAuth from './auth'
import reducerCategory from './category'
import reducerArticle from './article'
import reducerSlideshow from './slideshow'
import reducerSearch from './search'

const reducerRoot = combineReducers({
    reducerAuth,
    reducerCategory,
    reducerArticle,
    reducerSlideshow,
    reducerSearch,
    routing
})

export default reducerRoot
