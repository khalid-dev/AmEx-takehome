import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DistinctFilter = ({ name, options, setFilter, applyFilters }) => {
    return (
        <DropdownButton title={name}>
            {Object.keys(options).map(key => {
                return (
                    <Dropdown.Item 
                    key={key} 
                    active={options[key]} 
                    onClick={() => {
                        setFilter(name, key, !options[key]);
                        applyFilters();
                    }}>
                        {key}
                    </Dropdown.Item>
                )
            })}  
        </DropdownButton>
    );
};

export default DistinctFilter;
