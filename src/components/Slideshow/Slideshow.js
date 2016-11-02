// both
import React, { Component } from 'react'
// get
import { Row, Col, Image } from 'react-bootstrap'
import {Link} from 'react-router'
// normal
import Slider from 'react-slick'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ActionGrade from 'material-ui/svg-icons/action/grade'
// css
import './slideshow.scss'

class Slideshow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideshows : null,
            activeCategory : null
        };
    }

    componentWillReceiveProps(nextProps) {
        let states = this.state;

        if(nextProps.slideshows !== this.props.slideshows) {
            states.slideshows = nextProps.slideshows;
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

    renderSlideshows() {
        let slideshow = null
        const settings = {
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
        }

        if(typeof this.state.slideshows !== 'undefined' && this.state.slideshows !== null) {
            slideshow = this.state.slideshows.map(item => {
                return (
                    <div key={item.id} className="slideshow-wrapper">
                        <Row>
                            <Col md={8} className="slideshow-img">
                                <Link to={`/chuyen-muc/` + this.state.activeCategory}>
                                    <Image src={item.image} responsive />
                                </Link>
                                <div className="slideshow-star">
                                    <IconButton>
                                        <ActionGrade color='#FFFFFF' />
                                    </IconButton>
                                    <IconButton>
                                        <StarBorder color='#FFFFFF' />
                                    </IconButton>
                                    <IconButton>
                                        <StarBorder color='#FFFFFF' />
                                    </IconButton>
                                </div>
                            </Col>
                            <Col md={4} className="slideshow-content">
                                <Row>
                                    <Col md={12} className="slideshow-create">
                                        Ngày đăng: {item.created_at}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="slideshow-title">
                                        {item.title}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="slideshow-des">
                                        {item.description}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            })
        }

        if(slideshow !== null) {
            return (
                <Row>
                    <Col md={12} xs={12} className="slideshow">
                        <div className="slideshow-main">
                            <Slider {...settings}>
                                {slideshow}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            )
        }

        return slideshow
    }

    render() {
        return (
            <section>
                {this.renderSlideshows()}
            </section>
        )
    }
}

export default Slideshow
