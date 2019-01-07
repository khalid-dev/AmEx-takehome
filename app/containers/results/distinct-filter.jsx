import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DistinctFilter = ({ name, options, handleClick }) => {
    return (
        <DropdownButton title={name}>
            {Object.keys(options).map(key => {
                return (
                    <Dropdown.Item 
                    key={key} 
                    disabled={options[key]} 
                    onClick={() => {
                        handleClick(name, key, !options[key])
                    }}>
                        {key}
                    </Dropdown.Item>
                )
            })}  
        </DropdownButton>
    );
};

export default DistinctFilter;
