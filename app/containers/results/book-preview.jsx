import React, { Component } from 'react';
import { Row, Col, Image, Card } from 'react-bootstrap';
import { withRouter } from "react-router";

class BookPreview extends Component {
    render () {
        const { bookInfo, bookIx, history } = this.props;
        const { cover_i, title, author_name, first_publish_year } = bookInfo;
        const coverURL = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : `https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg`;
        return (
            <Card
            border="dark"
            onClick={() => history.push(`${history.location.pathname}book=${bookIx}`)}>
                <Card.Body>
                    <Card.Img variant="top" src={coverURL}/>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>{title}</Card.Text>
                    <Card.Title>Author</Card.Title>
                    <Card.Text>{author_name || 'No author specified'}</Card.Text>
                    <Card.Title>First Published</Card.Title>
                    <Card.Text>{first_publish_year || 'No publish date specified'}</Card.Text>
                </Card.Body>
            </Card>
        );
    };
};

export default withRouter(BookPreview);
