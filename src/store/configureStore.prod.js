// both
import {createStore, applyMiddleware} from 'redux'
// normal
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
)

export default configureStore
