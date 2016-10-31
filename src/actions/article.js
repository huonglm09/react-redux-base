import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

// article list action creator
export const articleListRequest = (data) => ({type: types.ARTICLE_LIST_REQUEST, data});

export const articleListFailed = (data) => ({type: types.ARTICLE_LIST_FAILED, data});

export const articleListSuccessfully = (data) => ({type: types.ARTICLE_LIST_SUCCESSFULLY, data});

// article list action fetch
export const articleListFetch = (data) => { return true }

export const articleListShouldFetch = (state, data) => { return true }

export const articleListFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (articleListShouldFetch(getState(), data)) {
            return dispatch(articleListFetch(data))
        }
    };
}

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

// article slideshow action fetch
export const articleSlideshowFetch = (data) => { return true }

export const articleSlideshowShouldFetch = (state, data) => { return true }

export const articleSlideshowFetchIfNeeded = (data) => {
    return (dispatch, getState) => {
        if (articleSlideshowShouldFetch(getState(), data)) {
            return dispatch(articleSlideshowFetch(data))
        }
    };
}

// article slideshow action mid
export const midArticleListSlideshow = (data) => middleware.callApi(
    constants.API_ARTICLE_SLIDESHOW + '/' + data.categoryId , {
        method: 'get'
    },
    articleSlideshowRequest(data),
    articleSlideshowSuccessfully,
    articleSlideshowFailed
);
