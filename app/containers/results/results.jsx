import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SearchBar } from '../../components/index.js';
import { BookPreview } from './index.js';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 10,
            filters: {},
            sortBy: ''
        }
    };

    generateFilters() {

    };

    renderFilters() {

    };

    generatePreviews() {
        const { filteredResults, currentPage } = this.props;
        const { step } = this.state;
        const startIx = (currentPage - 1) * step;
        const endIx = startIx + step;
        const bookPreviews = filteredResults
            .slice(startIx, endIx)
            .map((book, ix)=> <BookPreview bookInfo={book} bookIx={startIx + ix}/>)
        return (
            <React.Fragment>
                {bookPreviews}
            </React.Fragment>
        )
    };

    setFilter(filterCategory, filerName, value) {

    };

    componentDidMount() {
        this.generateFilters();
    }

    render() {
        return (
            <Container>
                <SearchBar />
                <Row>
                    <Col>
                        {/* <SortBy /> */}
                        {this.renderFilters()}
                    </Col>
                    <Col>
                        {this.generatePreviews()}
                    </Col>
                </Row>
                {/* <BottomNav step={this.state.step} /> */}
            </Container>
        );
    };
};

const mapStateToProps = state => {
    return {
        filteredResults: state.filteredResults,
        selectedFilters: state.selectedFilters,
        currentPage: state.currentPage
    };
};

const ConnectedResults = connect(mapStateToProps, null)(Results);

export default ConnectedResults;
