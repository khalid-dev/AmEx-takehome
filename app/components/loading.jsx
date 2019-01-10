import React from 'react';

const Loading = () => {
    return (
        <div className="loaderContainer">
            <svg viewBox="0 0 100 100" className="loader" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40px" fill="none" stroke="blue" strokeWidth="5" strokeDasharray="280px" strokeDashoffset="314px" className="circleLoader"/>
            </svg>
            <h1>Loading Results...</h1>
        </div>
    );
};

export default Loading;