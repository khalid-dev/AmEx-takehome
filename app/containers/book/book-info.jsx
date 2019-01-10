import React from 'react';
import { Col, Row, Image, Card } from 'react-bootstrap';


const BookInfo = ({ book }) => {
    const { cover_i, title, author_name, first_publish_year, ebook_count_i, language, subject } = book;
    const coverURL = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : `https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg`;
    return (
        <Row>
            <Col lg={6}>
                <Image aria-hidden="true" className="align-left customImage" src={coverURL} />
            </Col>
            <Col lg={6}>
                <Card.Title>Title:</Card.Title>
                <Card.Text>{title}</Card.Text>
                <Card.Title>Author:</Card.Title>
                <Card.Text>{author_name || 'No author specified'}</Card.Text>
                <Card.Title>First Published In:</Card.Title>
                <Card.Text>{first_publish_year || 'No publish date specified'}</Card.Text>
                <Card.Title>Has e-book?</Card.Title>
                <Card.Text>{ebook_count_i ? 'Yes' : 'No'}</Card.Text>
                <Card.Title>Available Languages:</Card.Title>
                <Card.Text>{language ? language.join(', ') : 'No languages specified'}</Card.Text>
                <Card.Title>Subjects:</Card.Title>
                <Card.Text>{subject ? subject.join(', ') : 'No subjects specified'}</Card.Text>
            </Col>
        </Row>
    );
};

export default BookInfo;