// get
import { helper } from '../commons'
// normal
import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// article search action creator
export const articleSearchRequest = (data) => ({type: types.ARTICLE_SEARCH_REQUEST, data});

export const articleSearchFailed = (data) => ({type: types.ARTICLE_SEARCH_FAILED, data});

export const articleSearchSuccessfully = (data) => ({type: types.ARTICLE_SEARCH_SUCCESSFULLY, data});

// article search action mid
export const midArticleSearch = (data) => middleware.callApi(
    constants.API_ARTICLE_SEARCH , {
        method: 'post',
        body: helper.convertObjectFormData(data)
    },
    articleSearchRequest(data),
    articleSearchSuccessfully,
    articleSearchFailed
);
