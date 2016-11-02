import * as types from '../types'

const reducerAuth = (state = null, action) => {
    switch (action.type) {
        case types.AUTH_LOGIN_REQUEST:
            return action.data
        case types.AUTH_LOGIN_FAILED:
            return action.data
        case types.AUTH_LOGIN_SUCCESSFULLY:
            return action.data
        default:
            return state
    }
}

export default reducerAuth
