// both
import React, { Component } from 'react'
// get
import {Link} from 'react-router'
import { Grid, Row, Col, Image } from 'react-bootstrap'
// normal
import Search from '../Search/Search'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// css
import './header.scss'

class Header extends Component {
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

    renderListCategory() {
        let colors = ['FFD401', 'A8D9D6', 'EC6607', '3AB54B', '75AADC']
        if(typeof this.state.categories !== 'undefined' && this.state.categories !== null) {
            return this.state.categories.map(item => {
                const key = Math.random()*colors.length
                let color = colors[Math.floor(key)]
                colors.splice(key, 1);

                let classActive = ''
                if(this.props.activeCategory === item.slug) {
                    classActive = ' active'
                }

                return (
                    <Link key={item.title} className={"menu-link" + classActive} to={`/chuyen-muc/` + item.slug}>
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
                             <Col md={3} xs={12} sm={6}>
                                 <div className="top-logo">
                                     <Link to={`/`}>
                                         <Image src="/images/logos/logo.png" responsive />
                                     </Link>
                                 </div>
                             </Col>
                            <Col md={6} mdOffset={3} xs={12} sm={6}>
                                <Search onSearch={this.props.onSearch} searchs={this.state.searchs}/>
                            </Col>
                         </Row>
                     </Grid>

                    <div className="menu">
            			<Grid>
                          <div className="main-menu">
                              <div className="menu-list">
                                  {this.renderListCategory()}
                              </div>
                              <div className="menu-icon">
                                  <IconMenu
                                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                  >
                                        {this.renderListCategory()}
                                  </IconMenu>
                                  <div className="menu-cat-list">
                                      Danh sách chuyên mục
                                  </div>
                              </div>
                          </div>
            			</Grid>
            	    </div>
                </div>
            </header>
        )
    }
}

export default Header
