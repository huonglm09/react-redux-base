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

        const data = {
            'type': 'listArticleByCategory',
            'categoryId': this.props.params.category
        }

        this.props.dispatch(articleActions.midArticleList(data));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.category !== this.props.params.category) {
            const data = {
                'type': 'listArticleByCategory',
                'categoryId': nextProps.params.category
            }

            this.props.dispatch(articleActions.midArticleList(data));
        }
    }

    componentDidMount() {
        document.title = "Sắc màu công nghệ | Danh mục"
    }

    render() {
        const {categories, articles} = this.props
        return (
            <Layout categories={categories}>
                <Slideshow articles={articles}/>
                <Article articles={articles}/>
            </Layout>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => {
    let { categoryReducer, articleReducer } = state;

    if(categoryReducer != null && typeof categoryReducer !== 'undefined') {
        categoryReducer = categoryReducer.data
    }

    if(articleReducer != null && typeof articleReducer !== 'undefined') {
        articleReducer = articleReducer.data
    }

    return {
        categories : categoryReducer,
        articles : articleReducer
    };
};

/**
 * Connect the component to
 * the Redux Store.
 */
export default connect(
    mapStateToProps
)(CategoryPage);
