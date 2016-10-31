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

    renderListCategory() {
        let colors = ['FFD401', 'A8D9D6', 'EC6607', '3AB54B', '75AADC']
        if(typeof this.state.categories !== 'undefined' && this.state.categories !== null) {
            return this.state.categories.map(item => {
                const key = Math.random()*colors.length
                let color = colors[Math.floor(key)]
                colors.splice(key, 1);

                return (
                    <Link key={item.title} className="menu-link" to={`/chuyen-muc/` + item.slug}>
                          <MenuItem className="menu-item" primaryText={item.title} />
                          <div className={"menu-border border-" + color}></div>
                    </Link>
                )
            })
        }
    }

    render() {
        return (
          <header>
                <div className="header-top">
                     <Grid>
                         <Row>
                             <Col md={6}>
                                 <div className="top-logo">
                                     <Link to={`/`}>
                                         <Image src="/images/logos/logo.png" responsive />
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
                              {this.renderListCategory()}
                          </div>
            			</Grid>
            	    </div>
                </div>
            </header>
        )
    }
}

export default Header
