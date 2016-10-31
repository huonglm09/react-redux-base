import * as auth from './auth'
import * as category from './category'
import * as article from './article'

module.exports = {
    ...auth,
    ...category,
    ...article
}
