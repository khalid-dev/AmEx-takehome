import ignoredFilters from './ignored-filters.js';

const generateFilter = (filters, key, val) => {
    if (!ignoredFilters[key]) {
        const numericalVal = Number(val);
        if (numericalVal) {
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
            filters[key] = {
                type: 'distinct',
                isSelected: 'false'
            };
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
