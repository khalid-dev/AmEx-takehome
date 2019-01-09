import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import BookInfo from './book-info.jsx';
import { SearchBar } from '../../components/index.js';
import { Link } from 'react-router-dom';
// TODO ERROR HANDLING IF SEARCH RESULT RETURSN NO RESULTS AND ERROR HANDLING FOR 500? CAN BE DONE SAME WAY?

class Book extends Component {
    render() {
        const { filteredResults, match, searchURL, currentPage } = this.props;
        const book = filteredResults[match.params.bookId];
        return (
            <Container>
                <SearchBar />
                <Card>
                    <Card.Header className="text-center">
                        <Link
                        to={`/results/${searchURL}/page=${currentPage}`}>
                        Click here to return to search results
                        </Link>
                    </Card.Header>
                    <BookInfo book={book}/>
                </Card>
            </Container>
        );
    };
};

const mapStateToProps = state => {
    return {
        filteredResults: state.filteredResults,
        searchURL: state.searchURL,
        currentPage: state.currentPage
    };
};

const ConnectedBook = connect(mapStateToProps, null)(Book);
export default ConnectedBook;
