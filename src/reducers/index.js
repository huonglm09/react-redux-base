import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import articleReducer from './article'

const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    articleReducer,
    routing
})

export default rootReducer
