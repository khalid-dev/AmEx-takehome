import allowedFilters from './allowed-filters.js';

const filterFiller = (filters, key, val) => {
    if (!isNaN(val)) {
        const numericalVal = Number(val);
        if (filters[key]) {
            if (val < filters[key].min) {
                filters[key].min = numericalVal;
                filters[key].selectedVal = numericalVal;
            };
            if (val > filters[key].max) {
                filters[key].max = numericalVal;
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
