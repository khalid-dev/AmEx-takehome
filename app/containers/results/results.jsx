import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { SearchBar } from '../../components/index.js';
import { BookPreview } from './index.js';
import ignoredFilters from './ignored-filters.js';
import { queryAPI } from '../../store/index.js';

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
        const { filteredResults } = this.props;
        const filters = {};
        filteredResults.forEach(result => {
            Object.keys(result).forEach(key => {
                const val = result[key];
                if (!ignoredFilters[key]) {
                    if (Number(val)) {
                        if (filters[key]) {
                            if (val < filters[key].min) {
                                filters[key].min = Number(val);
                            };
                            if (val > filters[key].max) {
                                filters[key].max = Number(val);
                            };
                        }
                        else {
                            filters[key] = {
                                min: Number(val),
                                max: Number(val)
                            };
                        };
                    }
                    else {
                        filters[key] = {
                            type: 'distinct',
                            isSelected: 'false'
                        };
                    };
                };
            });
        });
        console.log('FILTERS: ', filters);
        this.setState({filters});
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
        const { history, searchURL, queryAPI } = this.props
        //if browser URL is different from redux store's searchURL, a thunk is dispatched to get the appropriate results
        if (history.location.search !== searchURL) {
            queryAPI(history.location.search)
        }
        this.generateFilters();
    };

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

const mapDispatchToProps = dispatch => {
    return {
        queryAPI: (queryURL) => {
            dispatch(queryAPI(null, null, queryURL));
        }
    };
};

const mapStateToProps = state => {
    return {
        filteredResults: state.filteredResults,
        selectedFilters: state.selectedFilters,
        currentPage: state.currentPage,
        searchURL: state.searchURL
    };
};

const ConnectedResults = connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));

export default ConnectedResults;
