import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryAPI } from '../store/index.js';
import { Button } from 'react-bootstrap';

class Suggestion extends Component {
    render() {
        const { queryName, queryPrefix, queryBody } = this.props;
        return (
            <Button onClick={() => this.props.queryAPI(queryPrefix, queryBody)}>{queryName}</Button>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        queryAPI: (queryPrefix, queryBody) => {
            dispatch(queryAPI(queryPrefix, queryBody));
        }
    };
};

const ConnectedSuggestion = connect(null, mapDispatchToProps)(Suggestion);

export default ConnectedSuggestion;
