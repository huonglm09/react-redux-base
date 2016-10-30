import * as types from '../types'

const categoryReducer = (state = null, action) => {
    switch (action.type) {
        case types.CATEGORY_LIST_REQUEST:
            return action.data
        case types.CATEGORY_LIST_FAILED:
            return action.data
        case types.CATEGORY_LIST_SUCCESSFULLY:
            return action.data
        default:
            return state
    }
}

export default categoryReducer
