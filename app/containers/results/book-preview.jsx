import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router";

class BookPreview extends Component {
    render () {
        console.log(this.props);
        return (
            <Row>
                <Col>
                </Col>
                <Col>
                    <Row>

                    </Row>
                    <Row>
                        
                    </Row>
                    <Row>
                        
                    </Row>
                </Col>
            </Row>
        );
    };
};

export default withRouter(BookPreview);
