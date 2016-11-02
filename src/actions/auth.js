// get
import { helper } from '../commons'
// normal
import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// auth login action creator
export const authLoginRequest = (data) => ({type: types.AUTH_LOGIN_REQUEST, data});

export const authLoginFailed = (data) => ({type: types.AUTH_LOGIN_FAILED, data});

export const authLoginSuccessfully = (data) => ({type: types.AUTH_LOGIN_SUCCESSFULLY,data});

// auth login action fetch
export const authLoginFetch = (data) => { return true }

export const authLoginShouldFetch = (state, page) => { return true }

export const authLoginFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (authLoginShouldFetch(getState(), data)) {
            return dispatch(authLoginFetch(data))
        }
    };
}

// auth login action mid
export const midLogin = (data) => middleware.callApi(
    constants.API_AUTH_LOGIN, {
        method: 'post',
        body: helper.convertObjectFormData(data)
    },
    authLoginRequest(data),
    authLoginSuccessfully,
    authLoginFailed
);
