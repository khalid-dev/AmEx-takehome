import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SearchBar } from '../../components/index.js';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 10,
            filters: {},
            selectedFilters: {},
            sortBy: ''
        };
    };

    generateFilters() {

    };

    renderFilters() {

    };

    generatePreviews() {

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
        campuses: state.campuses
    };
};

export default 