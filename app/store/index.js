import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';
import history from '../history.js';
import { generateFilters, setSingleFilter, applyAllFilters, sort, toggleFilters } from './utils.js';

const GOT_RESULTS = "GOT_RESULTS";
const TOGGLE_LOADING = "TOGGLE_LOADING";
const FILTER_SET = "FILTER_SET";
const APPLIED_FILTERS = "APPLIED_FILTERS";
const RESULTS_SORTED = "RESULTS_SORTED";
const ALL_FILTERS_TOGGLED = "ALL_FILTERS_TOGGLED";
const PAGE_SET = "PAGE_SET";
const GOT_MORE_RESULTS = "GOT_MORE_RESULTS";

const initialState = {
    searchURL: '',
    results: [],
    filters: {},
    filteredResults: [],
    isLoading: false,
    currentPage: 0,
    numResults: 0,
    searchURLPage: 0
};

const toggleLoading = () => {
    return {
        type: TOGGLE_LOADING
    }
;}

const gotSearchResults = (results, searchURL, currentPage, filters, numResults, searchURLPage) => {
    return {
        type: GOT_RESULTS,
        results,
        searchURL,
        currentPage,
        filters,
        numResults,
        searchURLPage
    };
};

const filterSet = (filterCategory, filterName, value) => {
    return {
        type: FILTER_SET,
        filterCategory,
        filterName,
        value
    };
};

const appliedFilters = (filteredResults) => {
    return {
        type: APPLIED_FILTERS,
        filteredResults
    };
};

const resultsSorted = (sortedResults) => {
    return {
        type: RESULTS_SORTED,
        sortedResults
    };
};

const allFiltersToggled = (toggledFilters, filteredResults) => {
    return {
        type: ALL_FILTERS_TOGGLED,
        toggledFilters,
        filteredResults
    };
};

const pageSet = (pageIx) => {
    return {
        type: PAGE_SET,
        pageIx
    };
};

const gotMoreResults = (moreResults, newFilteredResults, newFilters, newSearchURLPage) => {
    return {
        type: GOT_MORE_RESULTS,
        moreResults,
        newFilteredResults,
        newFilters,
        newSearchURLPage
    };
};

/**
 * @param {*} queryPrefix 
 * @param {*} queryBody 
 * @param {*} queryURL (optional)
 * @param {*} pageURL 
 * @return {dispatch}
 * A thunk that sends a GET request to Open Library's search.json API.
 * Dispatches actions that set state fields appropriately.
 */
export const queryAPI = (queryPrefix, queryBody, queryURL, pageURL) => {
    return async dispatch => {
        dispatch(toggleLoading());
        let response;
        let searchURL;
        try {
            if (queryURL) {
                searchURL = queryURL;
                response = await axios.get(`https://openlibrary.org/search.json${queryURL}&limit=90`);
            }
            else {
                const formattedQueryBody = queryBody.split(' ').join('+');
                searchURL = `?${queryPrefix}=${formattedQueryBody}`;
                response = await axios.get(`https://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=90`);
            }
            const numResults = response.data.numFound;
            const results = response.data.docs;
            const filters = generateFilters(results);
            const pageNum = pageURL.charAt(pageURL.length - 1);
            const action = gotSearchResults(results, searchURL, pageNum, filters, numResults, 1);
            dispatch(action);
            history.push(`/results/${searchURL}/${pageURL}`);
        }
        catch (err) {
            const results = [];
            dispatch(gotSearchResults(results));
            history.push(`/results`);
        };
        dispatch(toggleLoading());
    };
};

/** 
 * @param {*} filterCategory 
 * @param {*} filterName 
 * @param {*} value 
 * @return {dispatch}
 * A dispatch that dispatches an action to set a single filter, then applies all selected filters.
 */
export const setFilter = (filterCategory, filterName, value) => {
    return dispatch => {
        dispatch(filterSet(filterCategory, filterName, value));
        const filteredResults = applyFilters();
        dispatch(appliedFilters(filteredResults));
    };
};

export const applyFilters = (results, filters) => {
    return dispatch => {
        dispatch(toggleLoading());
        const filteredResults = applyAllFilters(results, filters);
        dispatch(appliedFilters(filteredResults));
        dispatch(toggleLoading());
    };
};

export const sortResults = (results, sortBy) => {
    return dispatch => {
        dispatch(toggleLoading());
        const sortedResults = sort(results, sortBy);
        dispatch(resultsSorted(sortedResults));
        dispatch(toggleLoading());
    };
};

export const toggleAllFilters = (results, filters, val) => {
    return dispatch => {
        dispatch(toggleLoading());
        const toggledFilters = toggleFilters(filters, val);
        const filteredResults = applyAllFilters(results, toggledFilters);
        dispatch(allFiltersToggled(toggledFilters, filteredResults));
        dispatch(appliedFilters(filteredResults));
        dispatch(toggleLoading());
    };
};

export const setPage = (pageIx) => {
    return dispatch => {
        dispatch(pageSet(pageIx));
    };
};

/**
 * @param {*} queryURL 
 * @param {*} searchURLPage 
 * @param {*} currentResults 
 * @returns {dispatch}
 * A thunk that sends a GET request to Open Library's search.json API for the next page of query results.
 * Dispatches actions that set state fields appropriately.
 */
export const getMoreResults = (queryURL, searchURLPage, currentResults) => {
    return async dispatch => {
        dispatch(toggleLoading());
        const nextSearchURLPage = searchURLPage + 1;
        const response = await axios.get(`https://openlibrary.org/search.json${queryURL}&limit=90&page=${nextSearchURLPage}`)
        const moreResults = currentResults.concat(response.data.docs);
        const newFilters = generateFilters(moreResults);
        const newFilteredResults = applyAllFilters(moreResults, newFilters)
        dispatch(gotMoreResults(moreResults, newFilteredResults, newFilters, nextSearchURLPage));
        dispatch(toggleLoading());
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_RESULTS:
            const { results, searchURL, currentPage, filters, numResults, searchURLPage } = action;
            return { ...state, results , filteredResults: results, searchURL, currentPage, filters, numResults, searchURLPage};
        case TOGGLE_LOADING:
            return { ...state, isLoading: !state.isLoading};
        case FILTER_SET:
            const { filterCategory, filterName, value } = action;
            const newFilters = setSingleFilter(state.filters, filterCategory, filterName, value)
            return { ...state, filters: newFilters};
        case APPLIED_FILTERS: 
            const { filteredResults } = action;
            return { ...state, filteredResults};
        case RESULTS_SORTED:
            const { sortedResults } = action;
            return { ...state, filteredResults: sortedResults };
        case ALL_FILTERS_TOGGLED:
            const { toggledFilters } = action;
            return { ...state, filters: toggledFilters };
        case PAGE_SET:
            const { pageIx } = action;
            return { ...state, currentPage: pageIx };
        case GOT_MORE_RESULTS:
            const { moreResults, newFilteredResults, newSearchURLPage } = action;
            return { ...state, results: moreResults, filteredResults: newFilteredResults, filters: action.newFilters, searchURLPage: newSearchURLPage };
        default:
            return state;
    };
};

const store = createStore(
    reducer, 
    applyMiddleware(
        thunkMiddleware.withExtraArgument({axios}),
        loggingMiddleware
    )
);
  
export default store;
