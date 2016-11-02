import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// article list action creator
export const articleListRequest = (data) => ({type: types.ARTICLE_LIST_REQUEST, data});

export const articleListFailed = (data) => ({type: types.ARTICLE_LIST_FAILED, data});

export const articleListSuccessfully = (data) => ({type: types.ARTICLE_LIST_SUCCESSFULLY, data});

// article list action mid
export const midArticleList = (data) => middleware.callApi(
    constants.API_ARTICLE_LIST + '/' + data.categoryId , {
        method: 'get'
    },
    articleListRequest(data),
    articleListSuccessfully,
    articleListFailed
);
