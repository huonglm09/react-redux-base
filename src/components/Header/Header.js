import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import {Link} from 'react-router'

import './header.scss'

class Header extends Component {
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
        let menu = '';
        if(typeof this.props.categories !== 'undefined' && this.props.categories !== null) {
            this.props.categories.map(function(item) {
                return menu = <Link className="menu-link" to={`/category/` + item.title}>
                                  <MenuItem className="menu-item" primaryText={item.title} />
                                  <div className="menu-border border-FFD401"></div>
                              </Link>
            })
        }

        return (
          <header>
                <div className="header-top">
                     <Grid>
                         <Row>
                             <Col md={6}>
                                 <div className="top-logo">
                                     <Link to={`/`}>
                                         <Image src="./images/logos/tesco-living-logo.png" responsive />
                                     </Link>
                                 </div>
                             </Col>
                            <Col md={6}>
                                <div className="search-area">
                                    <TextField hintText="Tìm kiếm"/>
                                    <i className="search-icon fa fa-search" aria-hidden="true"></i>
                                </div>
                            </Col>
                         </Row>
                     </Grid>

                    <div className="menu">
            			<Grid>
                          <div className="main-menu">
                              {menu}
                          </div>
            			</Grid>
            	    </div>
                </div>
            </header>
        )
    }
}

export default Header
