import React from 'react';
import { Alert } from 'react-bootstrap';

const noBooksFound = () => {
    return (
        <Alert variant="danger" className="text-center">
            <Alert.Heading>There are no books to look at :(</Alert.Heading>
            <p>
                Sorry for the inconvenience! Please perform a new search.
            </p>
        </Alert>
    )
};

export default noBooksFound;
