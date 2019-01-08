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

const initialState = {
    searchURL: '',
    results: [],
    filters: {},
    filteredResults: [],
    isLoading: false,
    currentPage: 0
};

const toggleLoading = () => {
    return {
        type: TOGGLE_LOADING
    }
;}

const gotSearchResults = (results, searchURL, currentPage, filters) => {
    return {
        type: GOT_RESULTS,
        results,
        searchURL,
        currentPage,
        filters
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

/**
 * PARAMS: queryPrefix, queryBody, queryURL (optional)
 * Returns a thunk that sends a GET request to Open Library's search.json API.
 * Apppropriately toggles loading while request is open and sets other state fields appropriately.
 */
export const queryAPI = (queryPrefix, queryBody, queryURL, pageURL) => {
    return async dispatch => {
        dispatch(toggleLoading());
        let response;
        let searchURL;
        if (queryURL) {
            response = await axios.get(`http://openlibrary.org/search.json${queryURL}&limit=1000`);
            searchURL = queryURL;
        }
        else {
            const formattedQueryBody = queryBody.split(' ').join('+');
            response = await axios.get(`http://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=1000`);
            searchURL = `?${queryPrefix}=${formattedQueryBody}`;
        }
        const results = response.data.docs;
        const filters = generateFilters(results);
        const pageNum = pageURL.charAt(pageURL.length - 1);
        const action = gotSearchResults(results, searchURL, pageNum, filters);
        dispatch(action);
        dispatch(toggleLoading());
        history.push(`/results/${searchURL}/${pageURL}`);
    };
};

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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_RESULTS:
            const { results, searchURL, currentPage, filters } = action;
            return { ...state, results , filteredResults: results, searchURL, currentPage, filters};
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
