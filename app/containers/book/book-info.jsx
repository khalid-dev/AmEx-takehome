import React from 'react';
import { Col, Row, Container, Image, Card } from 'react-bootstrap';

const BookInfo = ({ book }) => {
    console.log(book);
    const { cover_i, title, author_name, first_publish_year, ebook_count_i, language, subject } = book;
    const coverURL = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : `https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg`;
    return (
        <Container>
            <Card.Header className="text-center">{`${title}, ${author_name}`}</Card.Header>
            <Col lg={6}>
                <Image aria-hidden="true" className="align-left" src={coverURL} />
            </Col>
            <Col lg={6}>
                <Row>
                    {`Title: ${title}`}
                </Row>
                <Row>
                    {`Author: ${author_name || 'No author specified'}`}
                </Row>
                <Row>
                    {`First Published In: ${first_publish_year || 'No publish date specified'}`}
                </Row>
                <Row>
                    {`Has e-book? ${ebook_count_i ? 'Yes' : 'No'}`}
                </Row>
                <Row>
                    {`Available Languages: ${language ? language.join(', ') : 'No languages specified'}`}
                </Row>
                <Row>
                    {`Subjects: ${subject ? subject.join(', ') : 'No subjects specified'}`}
                </Row>
            </Col>
        </Container>
    );
};

export default BookInfo;