import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as categoryActions from '../actions/category'
import * as articleActions from '../actions/article'
import Layout from '../components/Layout/Layout'
import Article from '../components/Article/Article'
import Slideshow from '../components/Slideshow/Slideshow'

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeCategory : null
        }
    }

    componentWillMount() {
        this.props.dispatch(categoryActions.midCategoryList());
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
        this.props.dispatch(articleActions.midArticleList({'categoryId': categoryId}));
    }

    dispatchSlideshow(categoryId) {
        this.props.dispatch(articleActions.midArticleListSlideshow({'categoryId': categoryId}));
    }

    dispatchSearch(keyword) {
        this.props.dispatch(articleActions.midArticleSearch({'keyword': keyword}));
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
)(HomePage);
