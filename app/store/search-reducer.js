import * as ACTION from './search-actions';

const initialState = {
    searchURL: '',
    response: [],
    filteredResponse: [],
    isLoading: false,
    currentBook:{}
};

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    };
};

export default searchReducer;