import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap'
import {Link} from 'react-router'

import './article.scss'

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles : null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.articles !== this.props.articles) {
            let states = this.state;
            states.articles = nextProps.articles;
            this.setState(states);
        }
    }

    renderArticles() {
        let colors = ['FFD401', 'A8D9D6', 'EC6607', '3AB54B', '75AADC']

        if(typeof this.state.articles !== 'undefined' && this.state.articles !== null) {
            return this.state.articles.map(item => {
                const key = Math.random()*colors.length
                let color = colors[Math.floor(key)]

                return (
                    <Col md={4} key={item.id}>
                        <div className="article-item">
                            <div className="article-img">
                                <Link to={`/`}>
                                    <Image src={item.image} responsive />
                                </Link>
                            </div>
                            <div className={"article-border border-" + color} />
                            <div className="article-content">
                                <div className="article-create">
                                    {item.created_at}
                                </div>
                                <div className="article-title">
                                    {item.title}
                                </div>
                                <div className="article-des">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    </Col>
                )
            })
        }
    }

    render() {
        return (
          <section>
                <div className="articles">                     
                     {this.renderArticles()}
                </div>
            </section>
        )
    }
}

export default Article
