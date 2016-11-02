// both
import React, { Component, PropTypes } from 'react'
// get
import { Grid } from 'react-bootstrap'
// normal
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// css
import './layout.scss'
import './responsive.scss'

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories : null,
            searchs : null
        };
    }

    componentWillReceiveProps(nextProps) {
        let states = this.state;

        if(nextProps.categories !== this.props.categories) {
            states.categories = nextProps.categories;
            this.setState(states);
        }

        if(nextProps.searchs !== this.props.searchs) {
            states.searchs = nextProps.searchs;
            this.setState(states);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="main-wrapper">
                    <Header categories={this.state.categories} activeCategory={this.props.activeCategory} searchs={this.state.searchs} onSearch={this.props.onSearch}/>

                    <Grid>
                        {this.props.children}
                    </Grid>

                    <Footer/>
                </div>
            </MuiThemeProvider>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
