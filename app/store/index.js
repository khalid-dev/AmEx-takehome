import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';
import history from '../history.js';
import { generateFilters } from './utils.js';

const GOT_RESULTS = "GOT_RESULTS";
const TOGGLE_LOADING = "TOGGLE_LOADING";

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

/**
 * @param {*} queryPrefix 
 * @param {*} queryBody 
 * Returns a thunk that sends a GET request to Open Library's search.json API.
 * Apppropriately toggles loading while request is open and sets other state fields appropriately.
 */
export const queryAPI = (queryPrefix, queryBody, queryURL) => {
    return async dispatch => {
        dispatch(toggleLoading());
        let response;
        let searchURL;
        if (queryURL) {
            response = await axios.get(`http://openlibrary.org/search.json${queryURL}`);
            searchURL = queryURL;
        }
        else {
            const formattedQueryBody = queryBody.split(' ').join('+');
            response = await axios.get(`http://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=1000`);
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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_RESULTS:
            const { results, searchURL, currentPage, filters } = action;
            return { ...state, results , filteredResults: results, searchURL, currentPage, filters};
        case TOGGLE_LOADING:
            return { ...state, isLoading: !state.isLoading};
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
