import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'

const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    routing
})

export default rootReducer
