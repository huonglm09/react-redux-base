import React, { Component, PropTypes } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Grid } from 'react-bootstrap'

import './layout.scss'

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories : null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.categories !== this.props.categories) {
            let states = this.state;
            states.categories = nextProps.categories;
            this.setState(states);
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="main-wrapper">
                    <Header categories={this.state.categories} activeCategory={this.props.activeCategory}/>

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
