import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// category list action creator
export const categoryListRequest = (data) => ({type: types.CATEGORY_LIST_REQUEST, data});

export const categoryListFailed = (data) => ({type: types.CATEGORY_LIST_FAILED, data});

export const categoryListSuccessfully = (data) => ({type: types.CATEGORY_LIST_SUCCESSFULLY, data});

// category list action fetch
export const categoryListFetch = (data) => { return true }

export const categoryListShouldFetch = (state, data) => { return true }

export const categoryListFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (categoryListShouldFetch(getState(), data)) {
            return dispatch(categoryListFetch(data))
        }
    };
}

// category list action mid
export const midCategoryList = (data = {type : 'categoryList'}) => middleware.callApi(
    constants.API_CATEGORY_LIST, {
        method: 'get'
    },
    categoryListRequest(data),
    categoryListSuccessfully,
    categoryListFailed
);
