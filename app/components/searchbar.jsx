import React, { Component } from 'react';
import { Row, Dropdown, DropdownButton, Form, InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { queryAPI } from '../store/index.js';
import searchPrefixes from './constants/search-prefixes.js';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryPrefix: 'General',
            queryBody: ''
        };
        this.handlePrefixSelect = this.handlePrefixSelect.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    //try to combine these two below into one
    handlePrefixSelect(queryPrefix) {
        this.setState({queryPrefix});
    };

    handleBodyChange(evt) {
        const { name, value } = evt.target;
        this.setState({[name]: value});
    };

    handleSubmit() {
        const { queryPrefix, queryBody } = this.state;
        this.props.queryAPI(searchPrefixes[queryPrefix], queryBody);
    };

    render() {
        return (
            <Row>
                <InputGroup>
                    <DropdownButton 
                        as={InputGroup.Prepend}
                        variant="secondary"
                        id="dropdown-search-prefix" 
                        title={this.state.queryPrefix}>
                        {Object.keys(searchPrefixes).map(prefix => (
                            <Dropdown.Item 
                                key={prefix} 
                                as="button"
                                onClick={() => {
                                    this.handlePrefixSelect(prefix);
                                }}>
                                    {prefix}
                            </Dropdown.Item>)
                        )}
                    </DropdownButton>
                    <Form.Control placeholder="Enter search terms..." name="queryBody" onChange={this.handleBodyChange}></Form.Control>
                    <InputGroup.Append>
                        <Button variant="secondary" onClick={this.handleSubmit}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        queryAPI: (queryPrefix, queryBody) => {
            dispatch(queryAPI(queryPrefix, queryBody));
        }
    };
};

const ConnectedSearchBar = connect(null, mapDispatchToProps)(SearchBar);

export default ConnectedSearchBar;
