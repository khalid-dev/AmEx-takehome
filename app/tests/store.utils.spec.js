import { expect } from 'chai';
import { filterFiller, generateFilters, setSingleFilter, applyAllFilters, sort, toggleFilters } from '../store/utils.js';
import { objectCompare, arrayCompare } from './utils.js'

const results = [
    {
        author_name: ['J. R. R. Tolkein'],
        language: ['ger', 'fre', 'eng', 'ita'],
        title: 'The Lord of the Rings'
    },
    {
        author_name: ['Ernest Mathijs'],
        language: ['eng'],
        title: 'Lord of the Rings'
    },
    {
        author_name: ['Peter Arnold'],
        title: 'Lords of the Ring'
    }
];

const filters = {
    author_name: {
        'J. R. R. Tolkein': true,
        'Ernest Mathijs': true,
        'Peter Arnold': false,
    },
    language: {
        'ger': true,
        'fre': true,
        'eng': true,
        'ita': true
    }
};

describe('filterFiller() function', () => {
    it(`Sets a filter category's sub-filter to true`, () => {
        filterFiller(filters, 'author_name', 'Peter Arnold');
        expect(filters['author_name']['Peter Arnold']).to.equal(true);
    });
    it(`If a filter category doesn't exist in filters, it creates the filter category, and the sub-filter, and sets it to true`, () => {
        filterFiller(filters, 'new_filter_category', 'Khalid');
        expect(filters['new_filter_category']['Khalid']).to.equal(true);
    });
    after(() => {
        delete filters['new_filter_category'];
    });
});

describe('generateFilters() function', () => {
    it('Generates an accurate filters obj for the specified array of results', () => {
        expect(objectCompare(filters, generateFilters(results))).to.equal(true);
    });
});

describe('setSingleFilter() function', () => {
    it('Sets a single filter in filters with a specified value', () => {
        const newFilters = setSingleFilter(filters, 'author_name', 'Peter Arnold', false);
        expect(objectCompare(newFilters, filters)).to.equal(true);
    });
});

describe('applyAllFilters() function', () => {
    it('Returns a correct filteredResults object', () => {
        const correctFilteredResults = [
            {
                author_name: ['J. R. R. Tolkein'],
                language: ['ger', 'fre', 'eng', 'ita'],
                title: 'The Lord of the Rings'
            },
            {
                author_name: ['Ernest Mathijs'],
                language: ['eng'],
                title: 'Lord of the Rings'
            },
        ];
        const testFilteredResults = applyAllFilters(results, filters);
        expect(arrayCompare(testFilteredResults, correctFilteredResults)).to.equal(true);
    });
});

describe('sort() function', () => {
    it('Returns an accurate, author-name sorted results object', () => {
        const authorSortedDec = [
            {
                author_name: ['Ernest Mathijs'],
                language: ['eng'],
                title: 'Lord of the Rings'
            },
            {
                author_name: ['J. R. R. Tolkein'],
                language: ['ger', 'fre', 'eng', 'ita'],
                title: 'The Lord of the Rings'
            },
            {
                author_name: ['Peter Arnold'],
                title: 'Lords of the Ring'
            }
        ];
        const sortByDec = ['author_name', 'dec'];
        const sortByAsc = ['author_name', 'asc'];
        const testAuthorSortedDec = sort(results, sortByDec);
        const testAuthorSortedAsc = sort(results, sortByAsc);
        expect(arrayCompare(authorSortedDec, testAuthorSortedDec)).to.equal(true);
        expect(arrayCompare(authorSortedDec.reverse(), testAuthorSortedAsc)).to.equal(true);
    });
    it('Returns an accurate, title sorted results object', () => {
        const titleSortedDec = [
            {
                author_name: ['Ernest Mathijs'],
                language: ['eng'],
                title: 'Lord of the Rings'
            },
            {
                author_name: ['Peter Arnold'],
                title: 'Lords of the Ring'
            },
            {
                author_name: ['J. R. R. Tolkein'],
                language: ['ger', 'fre', 'eng', 'ita'],
                title: 'The Lord of the Rings'
            }
        ];
        const sortByDec = ['title', 'dec'];
        const sortByAsc = ['title', 'asc'];
        const testTitleSortedDec = sort(results, sortByDec);
        const testTitleSortedAsc = sort(results, sortByAsc);
        expect(arrayCompare(titleSortedDec, testTitleSortedDec)).to.equal(true);
        expect(arrayCompare(titleSortedDec.reverse(), testTitleSortedAsc)).to.equal(true);
    });
});

describe('toggleFilters() function', () => {
    it('Returns a new filters object with all filters set to a specified value', () => {
        const correctToggledFilters = {
            author_name: {
                'J. R. R. Tolkein': false,
                'Ernest Mathijs': false,
                'Peter Arnold': false,
            },
            language: {
                'ger': false,
                'fre': false,
                'eng': false,
                'ita': false
            }
        }
        const testToggledFilters = toggleFilters(filters, false);
        expect(objectCompare(correctToggledFilters, testToggledFilters)).to.equal(true);
    });
});
