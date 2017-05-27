import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers

// Combine Reducers
const reducers = combineReducers({
    router: routerReducer
});

export default reducers;
