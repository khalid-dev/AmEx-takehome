import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DistinctFilter = ({ name, options, setFilter, applyFilters }) => {
    const optionsCopy = Object.keys(options).slice();
    optionsCopy.sort();
    return (
        <DropdownButton title={name}>
            {optionsCopy.map(key => {
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
