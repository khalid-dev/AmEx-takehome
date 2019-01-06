import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';

const GOT_RESULTS = "GOT_RESULTS";

const initialState = {
    searchURL: '',
    results: [],
    filteredResults: [],
    isLoading: false,
    currentBook:{}
};

const gotSearchResults = (results, searchURL, currentBook) => {
    return {
        type: GOT_RESULTS,
        results,
        searchURL,
        currentBook
    };
};

export const queryAPI = (queryPrefix, queryBody) => {
    return async dispatch => {
        const formattedQueryBody = queryBody.split(' ').join('+');
        const response = await axios.get(`http://openlibrary.org/search.json?${queryPrefix}=${formattedQueryBody}&limit=1000`);
        const results = response.data.docs;
        const searchURL = `?${queryPrefix}=${formattedQueryBody}`
        const action = gotSearchResults(results, searchURL, results[0]);
        dispatch(action);
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_RESULTS:
            const { results, searchURL, currentBook } = action;
            return { ...state, results , filteredResults: results, searchURL, currentBook};
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
