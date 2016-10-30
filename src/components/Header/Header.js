import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {Link} from 'react-router'
import TextField from 'material-ui/TextField';

import './header.scss'

class Header extends Component {
    render() {
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
                                  <Menu className="main-menu">
                                      <Link className="menu-link" to={`/category/maps`}>
                                          {this.props.children}
                                          <MenuItem className="menu-item" primaryText="Life Hacks" />
                                          <div className="menu-border border-FFD401"></div>
                                      </Link>
                                      <Link className="menu-link" to={`/category/maps`}>
                                          <MenuItem className="menu-item" primaryText="Saving Money" />
                                          <div className="menu-border border-A8D9D6"></div>
                                      </Link>
                                      <Link className="menu-link" to={`/category/maps`}>
                                          <MenuItem className="menu-item" primaryText="Making & Doing" />
                                          <div className="menu-border border-EC6607"></div>
                                      </Link>
                                      <Link className="menu-link" to={`/category/maps`}>
                                          <MenuItem className="menu-item" primaryText="Home & Garden" />
                                          <div className="menu-border border-3AB54B"></div>
                                      </Link>
                                      <Link className="menu-link" to={`/category/maps`}>
                                          <MenuItem className="menu-item" primaryText="Health & Wellbeing" />
                                          <div className="menu-border border-75AADC"></div>
                                      </Link>
                                  </Menu>
                			</Grid>
                	    </div>
                    </div>
                </header>
          )
    }
}

export default Header
