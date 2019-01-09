import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageNav = ({ length, step, currentPage, searchURL, setPage }) => {

    const generateLinks = () => {
        let startPage = 1;
        const newMinPage = currentPage - 5;
        if (newMinPage > 1) {
            startPage = newMinPage;
        };
        const totalPages = Math.ceil(length / step);
        const links = [];
        //Previous Link
        if (currentPage > 1) {
            const prevPageIx = Number(currentPage) - 1;
            links.push(
                <Link
                key="prev"
                to={`/results/${searchURL}/page=${prevPageIx}`} 
                onClick={() => setPage(prevPageIx)}>
                {`<< Previous`}
                </Link>
            );
        };
        //At most 10 Links
        for (let i = startPage; i < startPage + 10 && i <= totalPages; i++) {
            links.push(
                <Link 
                key={i} 
                to={`/results/${searchURL}/page=${i}`} 
                onClick={() => setPage(i)}>
                    {i}
                </Link>
            );
        };
        //Next Link
        if (currentPage < totalPages) {
            const nextPageIx = Number(currentPage) + 1;
            links.push(
                <Link
                key="next"
                to={`/results/${searchURL}/page=${nextPageIx}`} 
                onClick={() => setPage(nextPageIx)}>
                {`Next >>`}
                </Link>
            );
        }
        return links;
    };
    
    return (
        <Row className="justify-content-md-center pageNav">
            {generateLinks()}
        </Row>
    );
};

export default PageNav;