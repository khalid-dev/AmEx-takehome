import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { SearchBar, Suggestion, Loading } from '../../components/index.js';
import suggestedSearches from '../../components/constants/suggested-searches.js';

export class Home extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Container>
                <SearchBar />
                {this.props.isLoading ? 
                <Loading /> : 
                Object.keys(suggestedSearches).map(key => {
                    const [ queryPrefix, queryBody ] = suggestedSearches[key];
                    return (
                        <Suggestion 
                            key={key} 
                            queryName={key} 
                            queryPrefix={queryPrefix}
                            queryBody={queryBody}/>
                    )
                })}
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
