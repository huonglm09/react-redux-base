import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as categoryActions from '../actions/category'
import * as articleActions from '../actions/article'
import Layout from '../components/Layout/Layout'
import Article from '../components/Article/Article'
import Slideshow from '../components/Slideshow/Slideshow'

class CategoryPage extends Component {

    componentWillMount() {
        this.props.dispatch(categoryActions.midCategoryList());
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
        this.props.dispatch(articleActions.midArticleList({'categoryId': categoryId}));
    }

    dispatchSlideshow(categoryId) {
        this.props.dispatch(articleActions.midArticleListSlideshow({'categoryId': categoryId}));
    }

    dispatchSearch(keyword) {
        this.props.dispatch(articleActions.midArticleSearch({'keyword': keyword}));
    }

    render() {
        const {categories, articles, slideshows} = this.props
        return (
            <Layout categories={categories} activeCategory={this.props.params.category} onSearch={this.dispatchSearch.bind(this)}>
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
    let { categoryReducer, articleReducer, slideshowReducer, searchReducer } = state;

    if(categoryReducer != null && typeof categoryReducer !== 'undefined') {
        categoryReducer = categoryReducer.data
    }

    if(articleReducer != null && typeof articleReducer !== 'undefined') {
        articleReducer = articleReducer.data
    }

    if(slideshowReducer != null && typeof slideshowReducer !== 'undefined') {
        slideshowReducer = slideshowReducer.data
    }

    if(searchReducer != null && typeof searchReducer !== 'undefined') {
        searchReducer = searchReducer.data
    }

    return {
        categories : categoryReducer,
        articles : articleReducer,
        slideshows : slideshowReducer,
        searchs : searchReducer
    };
};

/**
 * Connect the component to
 * the Redux Store.
 */
export default connect(
    mapStateToProps
)(CategoryPage);
