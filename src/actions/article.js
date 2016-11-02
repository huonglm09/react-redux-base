import { helper } from '../commons'
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


// article slideshow action creator
export const articleSlideshowRequest = (data) => ({type: types.ARTICLE_SLIDESHOW_REQUEST, data});

export const articleSlideshowFailed = (data) => ({type: types.ARTICLE_SLIDESHOW_FAILED, data});

export const articleSlideshowSuccessfully = (data) => ({type: types.ARTICLE_SLIDESHOW_SUCCESSFULLY, data});

// article slideshow action mid
export const midArticleListSlideshow = (data) => middleware.callApi(
    constants.API_ARTICLE_SLIDESHOW + '/' + data.categoryId , {
        method: 'get'
    },
    articleSlideshowRequest(data),
    articleSlideshowSuccessfully,
    articleSlideshowFailed
);


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
