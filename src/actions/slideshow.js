import * as types from '../types'
import * as constants from '../constants'
import * as middleware from '../middleware'

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
