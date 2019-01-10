import React from 'react';
import { Alert } from 'react-bootstrap';

const noBooksFound = () => {
    return (
        <Alert variant="danger">
            <Alert.Heading>There are no books to look at! :(</Alert.Heading>
            <p>
                Sorry for the inconvenience! Please perform a fresh search.
            </p>
        </Alert>
    )
};

export default noBooksFound;
