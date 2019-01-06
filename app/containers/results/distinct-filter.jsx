import React from 'react';
import { Form } from 'react-bootstrap';

const DistinctFilter = ({ name, options }) => {
    return (
        <Form>
            {name}

            {Object.keys(options).map(key => {
                return <Form.Check key={key} type='checkbox' id={key} label={key} isValid='true'/>;
            })}
        </Form>
    );
};

export default DistinctFilter;
