import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import BookInfo from './book-info.jsx';
import { SearchBar } from '../../components/index.js';

class Book extends Component {
    render() {
        const { filteredResults, match } = this.props;
        return (
            <React.Fragment>
                <SearchBar />
                <BookInfo book={filteredResults[match.params.bookId]}/>
            </React.Fragment>
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
