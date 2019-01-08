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
        if (currentPage > 1) {
            const prevPageIx = Number(currentPage) - 1;
            navLinks.push(
                <NavLink
                key="prev"
                to={`/results/${searchURL}/page=${prevPageIx}`} 
                activeClassName="selected"
                onClick={() => setPage(prevPageIx)}>
                Previous
                </NavLink>
            );
        };
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
        if (currentPage < totalPages) {
            const nextPageIx = Number(currentPage) + 1;
            navLinks.push(
                <NavLink
                key="next"
                to={`/results/${searchURL}/page=${nextPageIx}`} 
                activeClassName="selected"
                onClick={() => setPage(nextPageIx)}>
                Next
                </NavLink>
            );
        }
        return navLinks;
    };
    
    return (
        <Row>
            {generateNavLinks()}
        </Row>
    );
};

export default PageNav;