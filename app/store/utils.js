import allowedFilters from './allowed-filters.js';

//Fills a single filter of filters appropriately with specified value
const filterFiller = (filters, key, val) => {
    if (!isNaN(val)) {
        const numericalVal = Number(val);
        const filter = filters[key];
        if (filter) {
            if (val < filter.min) {
                filter.min = numericalVal;
                filter.selectedVal = numericalVal;
            };
            if (val > filter.max) {
                filter.max = numericalVal;
            };
        }
        else {
            filters[key] = {
                min: numericalVal,
                max: numericalVal,
                selectedVal: numericalVal
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

//Generates a single filter to be filled
const generateFilter = (filters, key, val) => {
    if (allowedFilters[key]) {
        //if val is an array
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

//Generates all filters for the specified array of results
export const generateFilters = (results) => {
    const filters = {};
    results.forEach(result => {
        Object.keys(result).forEach(key => {
            const val = result[key];
            generateFilter(filters, key, val);
        });
    });
    return filters;
};

//Sets a single filter in filters with the specified value
export const setSingleFilter = (filters, filterCategory, filterName, value) => {
    const category = filters[filterCategory];
    //if category is a range
    if (category.max) {

    }
    else {
        category[filterName] = value;
    };
    return filters;
};

//Applies all specified filters to specified results
//TODO: refactor so it's easier to unit test
export const applyAllFilters = (results, filters) => {
    return results.filter(result => {
        let resultPassesFilter = false;
        Object.keys(filters).forEach(filterName => {
            if (result[filterName]) {
                const filter = filters[filterName];
                //if filter is a range
                if (filter.max) {

                }
                else {
                    //if result.filterName is an array
                    if (result[filterName].length) {
                        result[filterName].forEach(entry => {
                            if (filter[entry] === true) {
                                resultPassesFilter = true;
                            };
                        });
                    }
                    else {

                    };
                };
            };  
        });
        return resultPassesFilter;
    });
};
