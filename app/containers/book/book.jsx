import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import BookInfo from './book-info.jsx';
import { SearchBar } from '../../components/index.js';

class Book extends Component {
    render() {
        const { filteredResults, match } = this.props;
        const book = filteredResults[match.params.bookId];
        return (
            <Container>
                <SearchBar />
                <Card>
                    <Card.Header className="text-center">{`${book.title}, ${book.author_name}`}</Card.Header>
                    <BookInfo book={book}/>
                </Card>
            </Container>
        );
    };
};

const mapStateToProps = state => {
    return {
        filteredResults: state.filteredResults,
    };
};

const ConnectedBook = connect(mapStateToProps, null)(Book);
export default ConnectedBook;
