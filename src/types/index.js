import * as auth from './auth'
import * as category from './category'
import * as article from './article'
import * as search from './search'
import * as slideshow from './slideshow'

module.exports = {
    ...auth,
    ...category,
    ...article,
    ...search,
    ...slideshow
}
