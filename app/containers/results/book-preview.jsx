import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { withRouter } from "react-router";

class BookPreview extends Component {
    render () {
        const { bookInfo, bookIx, history } = this.props;
        const { cover_i, title, author_name, first_publish_year } = bookInfo;
        const coverURL = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : `https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg`;
        return (
            <Row onClick={() => history.push(`${history.location.pathname}/${bookIx}`)}>
                <Col>
                    <Image src={coverURL} thumbnail/>
                </Col>
                <Col>
                    <Row>
                        {`Title: ${title}`}
                    </Row>
                    <Row>
                        {`Author: ${author_name || 'No author specified'}`}
                    </Row>
                    <Row>
                        {`First Published In: ${first_publish_year || 'No publish date specified'}`}
                    </Row>
                </Col>
            </Row>
        );
    };
};

export default withRouter(BookPreview);
