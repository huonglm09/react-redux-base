import * as types from '../types'

const reducerSlideshow = (state = null, action) => {
    switch (action.type) {
        case types.ARTICLE_SLIDESHOW_REQUEST:
            return action.data
        case types.ARTICLE_SLIDESHOW_FAILED:
            return action.data
        case types.ARTICLE_SLIDESHOW_SUCCESSFULLY:
            return action.data
        default:
            return state
    }
}

export default reducerSlideshow
