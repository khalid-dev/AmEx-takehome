import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';
import history from '../history.js';
import { generateFilters, setSingleFilter, applyAllFilters, sort } from './utils.js';

const GOT_RESULTS = "GOT_RESULTS";
const TOGGLE_LOADING = "TOGGLE_LOADING";
const FILTER_SET = "FILTER_SET";
const APPLIED_FILTERS = "APPLIED_FILTERS";
const RESULTS_SORTED = "RESULTS_SORTED";

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

/**
 * PARAMS: queryPrefix, queryBody, queryURL (optional)
 * Returns a thunk that sends a GET request to Open Library's search.json API.
 * Apppropriately toggles loading while request is open and sets other state fields appropriately.
 */
export const queryAPI = (queryPrefix, queryBody, queryURL) => {
    return async dispatch => {
        dispatch(toggleLoading());
        let response;
        let searchURL;
        if (queryURL) {
            response = await axios.get(`https://openlibrary.org/search.json${queryURL}&limit=1000`);
            searchURL = queryURL;
        }
        else {
            const formattedQueryBody = queryBody.split(' ').join('+');
            response = await axios.get(`https://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=1000`);
            searchURL = `?${queryPrefix}=${formattedQueryBody}`;
        }
        dispatch(toggleLoading());
        const results = response.data.docs;
        const filters = generateFilters(results);
        const action = gotSearchResults(results, searchURL, 1, filters);
        dispatch(action);
        history.push(`/results/${searchURL}`);
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
