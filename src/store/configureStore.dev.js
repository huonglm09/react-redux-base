// both
import { createStore, applyMiddleware, compose } from 'redux'
// normal
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducerRoot from '../reducers'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
    const store = createStore(
        reducerRoot,
        preloadedState,
        compose(
            applyMiddleware(thunk, createLogger()),
            DevTools.instrument()
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore
