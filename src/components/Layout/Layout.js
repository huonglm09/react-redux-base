import React, { Component, PropTypes } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid } from 'react-bootstrap';

import './layout.scss'

class Layout extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="main-wrapper">
                    <Header/>

                    <Grid>
                        {this.props.children}
                        <RaisedButton label="Default" />
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
