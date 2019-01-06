import allowedFilters from './allowed-filters.js';

const filterFiller = (filters, key, val) => {
    if (!isNaN(val)) {
        const numericalVal = Number(val);
        if (filters[key]) {
            if (val < filters[key].min) {
                filters[key].min = numericalVal;
                filters[key].selectedNumber = numericalVal;
            };
            if (val > filters[key].max) {
                filters[key].max = numericalVal;
            };
        }
        else {
            filters[key] = {
                min: numericalVal,
                max: numericalVal,
                selectedNumber: numericalVal
            };
        };
    }
    else {
        if (filters[key]) {
            filters[key][val] = false;
        }
        else {
            filters[key] = { [val]: false}
        };
    };
};

const generateFilter = (filters, key, val) => {
    if (allowedFilters[key]) {
        if (val.length) {
            val.forEach(val => {
                filterFiller(filters, key, val);
            });
        }
        else {
            filterFiller(filters, key, val);
        };
    };
};

export const generateFilters = (results) => {
    const filters = {};
    results.forEach(result => {
        Object.keys(result).forEach(key => {
            const val = result[key];
            generateFilter(filters, key, val);
        });
    });
    console.log('FILTERS: ', filters);
    return filters;
};
