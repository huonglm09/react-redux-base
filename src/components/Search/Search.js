// both
import React, { Component } from 'react'
// get
import {Link} from 'react-router'
import { Row, Col, Image } from 'react-bootstrap'
// normal
import ScrollArea from 'react-scrollbar'
import AutoComplete from 'material-ui/AutoComplete'
// css
import './search.scss'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items : []
        }
    }

    componentWillReceiveProps(nextProps) {
        let states = this.state;

        if(nextProps.searchs !== this.props.searchs) {
            let searchs = nextProps.searchs;
            if(nextProps.searchs === null || typeof nextProps.searchs === 'undefined') {
                searchs = [];
            }

            states.items = searchs;
            this.setState(states);
        }
    }

    renderSearchList() {
        if(this.state.items !== null && typeof this.state.items !== 'undefined' && this.state.items.length > 0) {
            let colors = ['FFD401', 'A8D9D6', 'EC6607', '3AB54B', '75AADC']

            const list = this.state.items.map(item => {
                const key = Math.random()*colors.length
                let color = colors[Math.floor(key)]

                return (
                    <Link key={item.id} to={`/`}>
                        <Row>
                            <Col md={3} xs={4}>
                                <Image src={item.image} responsive />
                            </Col>
                            <Col md={9} xs={8}>
                                {item.title}
                            </Col>
                            <Col md={12} xs={12} className={'border-' + color} />
                        </Row>
                    </Link>
                )
            })

            return (
                <ScrollArea
                    speed={0.8}
                    className="search-list"
                    contentClassName="content"
                    horizontal={false}
                    >
                        {list}
                 </ScrollArea>
            )
        }
    }

    handleUpdateInput = (value) => {
        if(value.length < 1) {
            let states = this.state;
            states.items = [];
            this.setState(states);
        } else {
            this.props.onSearch(value);
        }
    }

    render() {
        return (
            <div className="search-area">
                <AutoComplete
                     className="search-input"
                     hintText="Tìm kiếm"
                     dataSource={this.state.items}
                     onUpdateInput={this.handleUpdateInput}
               />
                <i className="search-icon fa fa-search" aria-hidden="true"></i>

                {this.renderSearchList()}
            </div>
        )
    }
}

export default Search
