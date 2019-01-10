import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import langs from 'langs';

const DistinctFilter = ({ name, options, setFilter, applyFilters, toggleAllFilters }) => {
    const optionsCopy = Object.keys(options).slice();
    optionsCopy.sort();
    const filterName = name.split('_').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ');
    let langName;
    if (filterName === 'Language') {
        
    };
    return (
        <DropdownButton title={filterName} className="customDropdown">
            <Dropdown.Item active={false} onClick={() => toggleAllFilters(true)}>Select All</Dropdown.Item>
            <Dropdown.Item active={false} onClick={() => toggleAllFilters(false)}>Unselect All</Dropdown.Item>
            {optionsCopy.map(key => {
                return (
                    <Dropdown.Item 
                    key={key} 
                    active={options[key]} 
                    onClick={() => {
                        setFilter(name, key, !options[key]);
                        applyFilters();
                    }}>
                        {filterName === 'Language' && langs.where("2B", key) ? 
                        langs.where("2B", key)['name']
                        : key}
                    </Dropdown.Item>
                )
            })}  
        </DropdownButton>
    );
};

export default DistinctFilter;
