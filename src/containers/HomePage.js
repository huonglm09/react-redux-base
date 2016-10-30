import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'

class HomePage extends Component {
    componentDidMount() {
        document.title = "News | Home Page"
    }

    render() {
        return (
            <Layout>
                <div>
                    This is home page
                </div>
            </Layout>
        )
    }
}

/**
 * Connect the component to
 * the Redux Store.
 */
export default HomePage;
