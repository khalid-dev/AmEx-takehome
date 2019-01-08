import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const BookInfo = ({ book }) => {
    console.log(book);
    const { cover_i, title, author_name, first_publish_year } = book;
    const coverURL = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : `https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg`;
    return (
        <Card>
            <Card.Header className="text-center">{`${title}, ${author_name}`}</Card.Header>
            <Card.Img aria-hidden="true" src={coverURL} />
        </Card>
    );
};

export default BookInfo;