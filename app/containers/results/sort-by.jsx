import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import sortOptions from './sort-options.js';

export default class SortBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedBy: ''
        };
    };
    render() {
        const { sortedBy } = this.state;
        return (
            <DropdownButton title={`Sort by: ${sortedBy}`}>
                {Object.keys(sortOptions).map(key => {
                    return (
                        <Dropdown.Item 
                        key={key} 
                        active={sortedBy === key}
                        onClick={() => {
                            this.setState({sortedBy: key});
                            this.props.sortResults(sortOptions[key]);
                        }}>
                            {key}
                        </Dropdown.Item>
                    )
                })}  
            </DropdownButton>
        );
    };
};