import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { SearchBar } from '../../components/index.js';
import { BookPreview, DistinctFilter, RangeFilter } from './index.js';
import { queryAPI, setFilter } from '../../store/index.js';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 10,
            sortBy: ''
        }
    };

    renderFilters() {
        const { filters } = this.props;
        return (
            <React.Fragment>
                {Object.keys(filters).map(key => {
                    const val = filters[key];
                    if (val.max) {
                        const { min, max, selectedVal } = val;
                        return <RangeFilter key={key} name={key} min={min} max={max} selectedVal={selectedVal}/>
                    }
                    else {
                        return <DistinctFilter key={key} name={key} options={val} handleClick={this.props.setFilter}/>
                    }
                })}
            </React.Fragment>
        );
    };

    generatePreviews() {
        const { filteredResults, currentPage } = this.props;
        const { step } = this.state;
        const startIx = (currentPage - 1) * step;
        const endIx = startIx + step;
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
        },
        setFilter: (filterCategory, filterName, value) => {
            dispatch(setFilter(filterCategory, filterName, value));
        }
    };
};

const mapStateToProps = state => {
    return {
        filteredResults: state.filteredResults,
        filters: state.filters,
        currentPage: state.currentPage,
        searchURL: state.searchURL,
    };
};

const ConnectedResults = connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));

export default ConnectedResults;
