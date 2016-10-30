// import { helper } from '../commons'
import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// auth action creator
export const categoryListRequest = (data) => ({type: types.CATEGORY_LIST_REQUEST, data});

export const categoryListFailed = (data) => ({type: types.CATEGORY_LIST_FAILED, data});

export const categoryListSuccessfully = (data) => ({type: types.CATEGORY_LIST_SUCCESSFULLY, data});

export const categoryFetch = (data) => { return true }

export const categoryShouldFetch = (state, data) => { return true }

export const categoryFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (categoryShouldFetch(getState(), data)) {
            return dispatch(categoryFetch(data))
        }
    };
}

// auth action mid
export const midCategoryList = (data = {type : 'categoryList'}) => middleware.callApi(
    constants.API_CATEGORY_LIST, {
        method: 'get'
    },
    categoryListRequest(data),
    categoryListSuccessfully,
    categoryListFailed
);
