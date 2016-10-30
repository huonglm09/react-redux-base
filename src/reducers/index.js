import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReducer = combineReducers({
    authReducer,
    routing
})

export default rootReducer
