import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// auth action creator
export const articleListRequest = (data) => ({type: types.ARTICLE_LIST_REQUEST, data});

export const articleListFailed = (data) => ({type: types.ARTICLE_LIST_FAILED, data});

export const articleListSuccessfully = (data) => ({type: types.ARTICLE_LIST_SUCCESSFULLY, data});

export const articleFetch = (data) => { return true }

export const articleShouldFetch = (state, data) => { return true }

export const articleFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (articleShouldFetch(getState(), data)) {
            return dispatch(articleFetch(data))
        }
    };
}

// auth action mid
export const midArticleList = (data) => middleware.callApi(
    constants.API_ARTICLE_LIST + '/' + data.categoryId , {
        method: 'get'
    },
    articleListRequest(data),
    articleListSuccessfully,
    articleListFailed
);
