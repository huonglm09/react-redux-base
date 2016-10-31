import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import articleReducer from './article'
import slideshowReducer from './slideshow'

const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    articleReducer,
    slideshowReducer,
    routing
})

export default rootReducer
