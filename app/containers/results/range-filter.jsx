import React from 'react';

const RangeFilter = ({name, min, max, selectedVal}) => {
    return (
        <div>
            {name}
            <input type="range" min={min} max={max} defaultValue={selectedVal} step='1'/>
        </div>
    );
}

export default RangeFilter;
