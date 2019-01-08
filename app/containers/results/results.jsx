import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { SearchBar } from '../../components/index.js';
import { BookPreview, DistinctFilter, SortBy } from './index.js';
import { queryAPI, setFilter, applyFilters, sortResults, toggleAllFilters } from '../../store/index.js';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 10,
            sortBy: ''
        };
        /**
         * This is bound so that when the DistinctFilter component is clicked,
         * applyFilters can be called without the Distinct Filter component being connected to the redux store.*/
        this.applyFilters = this.applyFilters.bind(this);
        //Same as above for SortBy component
        this.sortResults = this.sortResults.bind(this);
        this.toggleAllFilters = this.toggleAllFilters.bind(this);
    };

    applyFilters() {
        const { applyFilters, results, filters } = this.props;
        applyFilters(results, filters);
    };

    sortResults(sortBy) {
        const { filteredResults, sortResults } = this.props;
        sortResults(filteredResults, sortBy);
    };

    toggleAllFilters(val) {
        const { results, filters, toggleAllFilters } = this.props;
        toggleAllFilters(results, filters, val);
    }

    renderFilters() {
        const { filters } = this.props;
        return (
            <React.Fragment>
                {Object.keys(filters).map(key => {
                    const val = filters[key];
                    return (
                        <DistinctFilter 
                        key={key} 
                        name={key} 
                        options={val} 
                        setFilter={this.props.setFilter} 
                        applyFilters={this.applyFilters}
                        toggleAllFilters={this.toggleAllFilters}/>
                    );
                })}
            </React.Fragment>
        );
    };

    generatePreviews() {
        const { filteredResults, currentPage } = this.props;
        const { step } = this.state;
        const startIx = (currentPage - 1) * step;
        const endIx = startIx + step;
        //Generates BookPreview components for the current page the user is viewing
        const bookPreviews = filteredResults
            .slice(startIx, endIx)
            .map((book, ix)=> <BookPreview key={ix} bookInfo={book} bookIx={startIx + ix}/>)
        return (
            <React.Fragment>
                {bookPreviews}
            </React.Fragment>
        )
    };

    componentDidMount() {
        const { history, searchURL, queryAPI } = this.props
        //if browser URL is different from redux store's searchURL, a thunk is dispatched to get the appropriate results
        if (history.location.search !== searchURL) {
            queryAPI(history.location.search);
        };
    };

    render() {
        return (
            <Container>
                <SearchBar />
                <Row>
                    <Col>
                        {this.renderFilters()}
                    </Col>
                    <Col>
                        <SortBy sortResults={this.sortResults}/>
                        {this.generatePreviews()}
                    </Col>
                </Row>
                {/* <BottomNav step={this.state.step} /> */}
            </Container>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        queryAPI: (queryURL) => {
            dispatch(queryAPI(null, null, queryURL));
        },
        setFilter: (filterCategory, filterName, value) => {
            dispatch(setFilter(filterCategory, filterName, value));
        },
        applyFilters: (results, filters) => {
            dispatch(applyFilters(results, filters));
        },
        sortResults: (results, sortBy) => {
            dispatch(sortResults(results, sortBy));
        },
        toggleAllFilters: (results, filters, val) => {
            dispatch(toggleAllFilters(results, filters, val));
        }
    };
};

const mapStateToProps = state => {
    return {
        results: state.results,
        filteredResults: state.filteredResults,
        filters: state.filters,
        currentPage: state.currentPage,
        searchURL: state.searchURL,
    };
};

const ConnectedResults = connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));

export default ConnectedResults;
