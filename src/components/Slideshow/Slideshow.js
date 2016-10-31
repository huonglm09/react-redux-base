import React, { Component } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import {Link} from 'react-router'
import Slider from 'react-slick'

import './slideshow.scss'

class Slideshow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideshows : null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.slideshows !== this.props.slideshows) {
            let states = this.state;
            states.slideshows = nextProps.slideshows;
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
                                <Link to={`/`}>
                                    <Image src={item.image} responsive />
                                </Link>
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
                    <Col md={12} className="slideshow">
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
