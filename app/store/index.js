import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import axios from 'axios';

const initialState = {
    searchURL: '',
    response: [],
    filteredResponse: [],
    isLoading: false,
    currentBook:{}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
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