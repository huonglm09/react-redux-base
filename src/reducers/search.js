import * as types from '../types'

const reducerSearch = (state = null, action) => {
    switch (action.type) {
        case types.ARTICLE_SEARCH_REQUEST:
            return action.data
        case types.ARTICLE_SEARCH_FAILED:
            return action.data
        case types.ARTICLE_SEARCH_SUCCESSFULLY:
            return action.data
        default:
            return state
    }
}

export default reducerSearch
