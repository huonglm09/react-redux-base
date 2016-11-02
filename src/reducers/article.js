import * as types from '../types'

const reducerArticle = (state = null, action) => {
    switch (action.type) {
        case types.ARTICLE_LIST_REQUEST:
            return action.data
        case types.ARTICLE_LIST_FAILED:
            return action.data
        case types.ARTICLE_LIST_SUCCESSFULLY:
            return action.data
        default:
            return state
    }
}

export default reducerArticle
