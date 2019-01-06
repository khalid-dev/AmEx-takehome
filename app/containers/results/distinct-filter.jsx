import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const DistinctFilter = ({ name, options }) => {
    return (
        // <Form>
        //     {name}
        //     {Object.keys(options).map(key => {
        //         return <Form.Check key={key} type='checkbox' id={key} label={key} />;
        //     })}
        // </Form>
        <DropdownButton title={name}>
            {Object.keys(options).map(key => {
                return <Dropdown.Item key={key} disabled={options[key]}>{key}</Dropdown.Item>
            })}  
        </DropdownButton>
    );
};

export default DistinctFilter;
