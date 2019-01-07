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
        return (
            <DropdownButton title={`Sort by: ${this.state.sortedBy}`}>
                {Object.keys(sortOptions).map(key => {
                    return (
                        <Dropdown.Item 
                        key={key} 
                        active={this.state.sortedBy === key}
                        onClick={() => {
                            this.setState({sortedBy: key})
                        }}>
                            {key}
                        </Dropdown.Item>
                    )
                })}  
            </DropdownButton>
        );
    };
};