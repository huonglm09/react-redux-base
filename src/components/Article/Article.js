// both
import React, { Component } from 'react'
// get
import {Link} from 'react-router'
import { Col, Image } from 'react-bootstrap'
// normal
import Masonry from 'react-masonry-component'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ActionGrade from 'material-ui/svg-icons/action/grade'
// css
import './article.scss'

class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles : null,
            activeCategory : null
        };
    }

    componentWillReceiveProps(nextProps) {
        let states = this.state;

        if(nextProps.articles !== this.props.articles) {
            states.articles = nextProps.articles;
            this.setState(states);
        }

        if(nextProps.activeCategory !== this.props.activeCategory) {
            states.activeCategory = nextProps.activeCategory;
            this.setState(states);
        }

        if(this.state.activeCategory === null && nextProps.activeCategory !== null && nextProps.activeCategory !== 'undefined') {
            states.activeCategory = nextProps.activeCategory;
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
                    <Col md={4} sm={6} key={item.id} className="article-masonry">
                        <div className="article-item">
                            <div className="article-img">
                                <Link to={`/chuyen-muc/` + this.state.activeCategory}>
                                    <Image src={item.image} responsive />
                                </Link>
                            </div>
                            <div className={"article-border border-" + color}>
                                <div className="article-star">
                                    <IconButton>
                                        <ActionGrade color={color} />
                                    </IconButton>
                                    <IconButton>
                                        <StarBorder color={color} />
                                    </IconButton>
                                    <IconButton>
                                        <StarBorder color={color} />
                                    </IconButton>
                                </div>
                            </div>
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
                                <div className="article-share border-top-thin">
                                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                                    SHARE
                                </div>
                            </div>
                        </div>
                    </Col>
                )
            })
        }
    }

    render() {
        const masonryOptions = {
            transitionDuration: 1000
        }

        return (
          <section>
                <div className="articles">
                    <Masonry
                        className={'article-masonry'}
                        elementType={'div'}
                        options={masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={false}
                    >
                        {this.renderArticles()}
                    </Masonry>
                </div>
            </section>
        )
    }
}

export default Article
