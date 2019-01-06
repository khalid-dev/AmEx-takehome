import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';

const GOT_RESULTS = "GOT_RESULTS";
const TOGGLE_LOADING = "TOGGLE_LOADING";

const initialState = {
    searchURL: '',
    results: [],
    selectedFilters: {},
    filteredResults: [],
    isLoading: false,
    currentPage: 0
};

const toggleLoading = () => {
    return {
        type: TOGGLE_LOADING
    }
;}

const gotSearchResults = (results, searchURL, currentPage) => {
    return {
        type: GOT_RESULTS,
        results,
        searchURL,
        currentPage
    };
};

/**
 * @param {*} queryPrefix 
 * @param {*} queryBody 
 * Returns a thunk that sends a GET request to Open Library's search.json API.
 * Apppropriately toggles loading while request is open and sets other state fields appropriately.
 */
export const queryAPI = (queryPrefix, queryBody) => {
    return async dispatch => {
        const formattedQueryBody = queryBody.split(' ').join('+');
        dispatch(toggleLoading());
        const response = await axios.get(`http://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=1000`);
        dispatch(toggleLoading());
        const results = response.data.docs;
        const searchURL = `?${queryPrefix}=${formattedQueryBody}`
        const action = gotSearchResults(results, searchURL, 1);
        dispatch(action);
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_RESULTS:
            const { results, searchURL, currentPage } = action;
            return { ...state, results , filteredResults: results, searchURL, currentPage};
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
