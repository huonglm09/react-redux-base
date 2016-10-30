import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

import './footer.scss'

class Footer extends Component {
    render() {
          return (
              <footer>
                    <section className="links">
                        <Grid>
                            <Row>
                                <Col md={3}>
                                    Footer 1
                                </Col>
                                <Col md={3}>
                                    Footer 2
                                </Col>
                                <Col md={3}>
                                    Footer 3
                                </Col>
                                <Col md={3}>
                                    Footer 4
                                </Col>
                            </Row>
                        </Grid>
                    </section>
                    <section className="logos">
                        <Grid>
                            <Row>
                                <Col md={12}>
                                    Footer Logos
                                </Col>
                            </Row>
                        </Grid>
                	</section>
                </footer>
          )
    }
}

export default Footer
