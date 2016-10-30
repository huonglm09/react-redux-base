import * as types from '../types'

const authState = {username: '', password: ''}

const authReducer = (state = authState, action) => {
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

export default authReducer
