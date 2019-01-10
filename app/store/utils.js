import allowedFilters from './allowed-filters.js';

/**
 * @param {*} filters 
 * @param {*} key 
 * @param {*} val 
 * @effects 
 *      Fills a single key of filters with specified value.
 */
export const filterFiller = (filters, key, val) => {
    if (filters[key]) {
        filters[key][val] = true;
    }
    else {
        filters[key] = { [val]: true}
    };
};

/**
 * @param {*} filters 
 * @param {*} key 
 * @param {*} val 
 * @effects
 *      Generates a single filter to be filled.
 */
export const generateFilter = (filters, key, val) => {
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

/**
 * @description
 *      Generates a filters obj for the specified array of results.
 * @param {*} results 
 * @returns {object} filters
 */
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

/**
 * 
 * @param {*} filters 
 * @param {*} filterCategory 
 * @param {*} filterName 
 * @param {*} value 
 * @returns {obj} filters
 * @effects
 *      Sets a single filter in filters with the specified value.
 */
export const setSingleFilter = (filters, filterCategory, filterName, value) => {
    const category = filters[filterCategory];
    category[filterName] = value;
    return filters;
};

/**
 * @description
 *      Creates a new filteredResults object by applying all specified filters to specified results.
 * @param {*} results 
 * @param {*} filters 
 * @returns {object} filteredResults
 */
export const applyAllFilters = (results, filters) => {
    const filteredResults = results.filter(result => {
        let resultPassesFilter = false;
        Object.keys(filters).forEach(filterName => {
            if (result[filterName]) {
                const filter = filters[filterName];
                //result.filterName is always an array at this point due to generateFilters()
                result[filterName].forEach(entry => {
                    if (filter[entry] === true) {
                        resultPassesFilter = true;
                    };
                });
            };
        });
        return resultPassesFilter;
    });
    return filteredResults;
};

const authorComparator = (bookA, bookB) => {
    const authorA = bookA['author_name'][0].toUpperCase();
    const authorB = bookB['author_name'][0].toUpperCase();
    if (authorA > authorB)
        return -1;
    if (authorA < authorB)
        return 1;
    else
        return 0;
};

const titleComparator = (bookA, bookB) => {
    const titleA = bookA['title'];
    const titleB = bookB['title'];
    if (titleA > titleB)
        return -1;
    if (titleA < titleB)
        return 1;
    else
        return 0;
};

const publishDateComparator = (bookA, bookB) => {
    const publishDateA = Number(bookA['first_publish_year']);
    const publishDateB = Number(bookB['first_publish_year']);
    if (publishDateA > publishDateB)
        return -1;
    if (publishDateA < publishDateB)
        return 1;
    else
        return 0;
};

/**
 * @description
 *          Creates a new sortedResults object by sorting results by one of three comparators.
 * @param {*} results 
 * @param {*} sortBy
 * @return {object} sortedResults
 */
export const sort = (results, sortBy) => {
    const resultsCopy = results.slice();
    const sortedResults = resultsCopy.sort((bookA, bookB) => {
        const [ attribute, order ] = sortBy;
        //orderMultiplier is used to potentially invert comparators' return values 
        let orderMultiplier = (order === 'asc' ? 1 : -1);

        if (bookA[attribute] && !bookB[attribute])
            return -1;
        if (!bookA[attribute] && bookB[attribute])
            return 1;
        if (!bookA[attribute] && !bookB[attribute])
            return 0;
        else {
            let comparatorVal = 0;
            switch(attribute) {
                case 'author_name':
                    comparatorVal = authorComparator(bookA, bookB);
                    break;
                case 'title':
                    comparatorVal = titleComparator(bookA, bookB);
                    break;
                case 'first_publish_year':
                    comparatorVal = publishDateComparator(bookA, bookB);
                default:
                    break;
            };
            return comparatorVal * orderMultiplier;
        };
    });
    return sortedResults;
};

/**
 * @description
 *      Creates a toggledFilters object by setting all of filters' values to val.
 * @param {*} filters 
 * @param {*} val 
 * @returns {object} toggledFilters
 */
export const toggleFilters = (filters, val) => {
    const toggledFilters = {};
    Object.keys(filters).forEach(filter => {
        toggledFilters[filter] = {};
        Object.keys(filters[filter]).forEach(subFilter => {
            toggledFilters[filter][subFilter] = val;
        });
    });
    return toggledFilters;
};
