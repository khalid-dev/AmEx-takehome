import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'
import searchReducer from './search-reducer.js';
import axios from 'axios';
import * as ACTION from './search-actions';

const store = createStore(
    searchReducer, 
    applyMiddleware(
        thunkMiddleware.withExtraArgument({axios}),
        loggingMiddleware
    )
);
  
export default store;