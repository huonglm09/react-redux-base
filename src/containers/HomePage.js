import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as categoryActions from '../actions/category'
import Layout from '../components/Layout/Layout'
import Article from '../components/Article/Article'

class HomePage extends Component {

    componentWillMount() {
        this.props.dispatch(categoryActions.midCategoryList());
    }

    componentDidMount() {
        document.title = "Sắc màu công nghệ | Trang chủ"
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {categories} = this.props
        return (
            <Layout categories={categories}>
                <Article />
            </Layout>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => {
    let { categoryReducer } = state;

    if(categoryReducer != null && typeof categoryReducer !== 'undefined') {
        categoryReducer = categoryReducer.data
    }

    return {
        categories : categoryReducer
    };
};

/**
 * Connect the component to
 * the Redux Store.
 */
export default connect(
    mapStateToProps
)(HomePage);
