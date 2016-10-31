import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
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
        const settings = {
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
        }

        return (
            <div className="slideshow">
                <Slider {...settings}>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                      <div>demosdfasdfasdfasdfasd</div>
                </Slider>
            </div>
        )
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
