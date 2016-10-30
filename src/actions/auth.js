import { helper } from '../commons'
import * as types from '../types'
import * as constants  from '../constants'
import * as middleware  from '../middleware'

// auth action creator
export const authLoginRequest = (data) => ({
    type: types.AUTH_LOGIN_REQUEST,
    data
});

export const authLoginFailed = (data) => ({
    type: types.AUTH_LOGIN_FAILED,
    data
});

export const authLoginSuccessfully = (data) => ({
    type: types.AUTH_LOGIN_SUCCESSFULLY,
    data
});

// auth action mid
export const midLogin = (data) => middleware.callApi(
    constants.API_AUTH_LOGIN, {
        method: 'post',
        body: helper.convertObjectFormData(data)
    },
    authLoginRequest(data),
    authLoginSuccessfully,
    authLoginFailed
);
