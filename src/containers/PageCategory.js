// both
import React, {Component} from 'react'
// get
import { connect } from 'react-redux';
// normal
import * as actionCategory from '../actions/category'
import * as actionArticle from '../actions/article'
import * as actionSlideshow from '../actions/slideshow'
import * as actionSearch from '../actions/search'
import Layout from '../components/Layout/Layout'
import Article from '../components/Article/Article'
import Slideshow from '../components/Slideshow/Slideshow'

class PageCategory extends Component {

    componentWillMount() {
        this.props.dispatch(actionCategory.midCategoryList());
        this.dispatchArticleList(this.props.params.category);
        this.dispatchSlideshow(this.props.params.category);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.category !== this.props.params.category) {
            this.dispatchArticleList(nextProps.params.category);
            this.dispatchSlideshow(nextProps.params.category);
        }
    }

    componentDidMount() {
        document.title = "Sắc màu công nghệ | Danh mục"
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
            <Layout categories={categories} activeCategory={this.props.params.category} searchs={searchs} onSearch={this.dispatchSearch.bind(this)}>
                <Slideshow slideshows={slideshows} activeCategory={this.props.params.category}/>
                <Article articles={articles} activeCategory={this.props.params.category}/>
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
)(PageCategory);
