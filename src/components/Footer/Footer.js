// both
import React, { Component } from 'react'
// get
import { Grid, Row, Col } from 'react-bootstrap'
// normal
import Social from '../Social/Social'
// css
import './footer.scss'

class Footer extends Component {
    render() {
          return (
              <footer>
                    <section className="links">
                        <Grid>
                            <Row>
                                <Col md={3} xs={6} className="f-col">
                                    <Row className="f-title">
                                        Here to Help
                                    </Row>
                                    <Row className="f-row">
                                        Contact Us
                                    </Row>
                                    <Row className="f-row">
                                        Store Locator
                                    </Row>
                                    <Row className="f-row">
                                        Prize Draw T&Cs
                                    </Row>
                                </Col>
                                <Col md={3} xs={6} className="f-col">
                                    <Row className="f-title">
                                        About Tesco
                                    </Row>
                                    <Row className="f-row">
                                        Contact Us
                                    </Row>
                                    <Row className="f-row">
                                        Store Locator
                                    </Row>
                                    <Row className="f-row">
                                        Prize Draw T&Cs
                                    </Row>
                                </Col>
                                <Col md={3} xs={6} className="f-col">
                                    <Row className="f-title">
                                        Explore Tesco
                                    </Row>
                                    <Row className="f-row">
                                        Contact Us
                                    </Row>
                                    <Row className="f-row">
                                        Store Locator
                                    </Row>
                                    <Row className="f-row">
                                        Prize Draw T&Cs
                                    </Row>
                                </Col>
                                <Col md={3} xs={6} className="f-col">
                                    <Row className="f-title">
                                        Tesco Living
                                    </Row>
                                    <Row className="f-row">
                                        Contact Us
                                    </Row>
                                    <Row className="f-row">
                                        Store Locator
                                    </Row>
                                    <Row className="f-row">
                                        Prize Draw T&Cs
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </section>
                    <section className="logos">
                        <Grid>
                            <Row>
                                <Col md={4} xs={12} sm={6} className="copyright">
                                    <strong>
                                        Bản quyền thuộc Sắc màu công nghệ © 2016
                                    </strong>
                                </Col>
                                <Col md={4} mdOffset={4} xs={12} sm={6}>
                                    <Social />
                                </Col>
                            </Row>
                        </Grid>
                	</section>
                </footer>
          )
    }
}

export default Footer
