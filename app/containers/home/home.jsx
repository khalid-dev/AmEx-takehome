import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { SearchBar, Suggestion } from '../../components/index.js';
import suggestedSearches from '../../components/constants/suggested-searches.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <Container>
                <SearchBar />
                {Object.keys(suggestedSearches).map(key => {
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
