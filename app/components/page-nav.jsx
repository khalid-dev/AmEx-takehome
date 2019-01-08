import React from 'react';
import { Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const PageNav = ({ length, step, currentPage, searchURL, setPage }) => {
    const generateNavLinks = () => {
        let startPage = 1;
        const newMinPage = currentPage - 5;
        if (newMinPage > 1) {
            startPage = newMinPage;
        };
        const totalPages = Math.ceil(length / step);
        const navLinks = [];
        for (let i = startPage; i < startPage + 10 && i <= totalPages; i++) {
            navLinks.push(
                <NavLink 
                key={i} 
                to={`/results/${searchURL}/page=${i}`} 
                activeClassName="selected"
                onClick={() => setPage(i)}>
                    {i}
                </NavLink>
            );
        };
        return navLinks;
    };
    
    return (
        <Row>
            {generateNavLinks()}
        </Row>
    );
};

export default PageNav;