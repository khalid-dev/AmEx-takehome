import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { SearchBar, Loading } from '../../components/index.js';

export class Home extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Container>
                <h1 className="text-center"> Search For a Book! </h1>
                <SearchBar />
                {this.props.isLoading ? 
                <Loading /> : 
                <React.Fragment/>}
            </Container>
        )
    };
};

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading
    };
};

const ConnectedHome = connect(mapStateToProps, null)(Home);
export default ConnectedHome;
