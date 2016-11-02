// both
import React, {Component} from 'react'
// get
import { connect } from 'react-redux'
// normal
import * as actionCategory from '../actions/category'
import * as actionArticle from '../actions/article'
import * as actionSlideshow from '../actions/slideshow'
import * as actionSearch from '../actions/search'
import Layout from '../components/Layout/Layout'
import Article from '../components/Article/Article'
import Slideshow from '../components/Slideshow/Slideshow'

class PageHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeCategory : null
        }
    }

    componentWillMount() {
        this.props.dispatch(actionCategory.midCategoryList());
    }

    componentDidMount() {
        document.title = "Sắc màu công nghệ | Trang chủ"
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categories !== nextProps.categories) {
            const {categories} = nextProps
            let activeCategory = null
            if(categories !== null && typeof categories !== 'undefined') {
                activeCategory = categories[0].slug
            }

            if(activeCategory !== null) {
                this.setState({
                    activeCategory: activeCategory
                })

                this.dispatchArticleList(activeCategory);
                this.dispatchSlideshow(activeCategory);
            }
        }
    }

    dispatchArticleList(categoryId) {
        this.props.dispatch(actionArticle.midArticleList({'categoryId': categoryId}));
    }

    dispatchSlideshow(categoryId) {
        this.props.dispatch(actionSlideshow.midArticleListSlideshow({'categoryId': categoryId}));
    }

    dispatchSearch(keyword) {
        this.props.dispatch(actionSearch.midArticleSearch({'keyword': keyword}));
    }

    render() {
        const {categories, articles, slideshows, searchs} = this.props

        return (
            <Layout categories={categories} activeCategory={this.state.activeCategory} searchs={searchs} onSearch={this.dispatchSearch.bind(this)}>
                <Slideshow slideshows={slideshows} activeCategory={this.state.activeCategory}/>
                <Article articles={articles} activeCategory={this.state.activeCategory}/>
            </Layout>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => {
     let { reducerCategory, reducerArticle, reducerSlideshow, reducerSearch } = state;

     if(reducerCategory != null && typeof reducerCategory !== 'undefined') {
         reducerCategory = reducerCategory.data
     }

     if(reducerArticle != null && typeof reducerArticle !== 'undefined') {
         reducerArticle = reducerArticle.data
     }

     if(reducerSlideshow != null && typeof reducerSlideshow !== 'undefined') {
         reducerSlideshow = reducerSlideshow.data
     }

     if(reducerSearch != null && typeof reducerSearch !== 'undefined') {
         reducerSearch = reducerSearch.data
     }

     return {
         categories : reducerCategory,
         articles : reducerArticle,
         slideshows : reducerSlideshow,
         searchs : reducerSearch
     };
 };

/**
 * Connect the component to
 * the Redux Store.
 */
export default connect(
    mapStateToProps
)(PageHome);
