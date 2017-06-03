import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import jigsawReducer from './jigsaw-reducer';

// Combine Reducers
const reducers = combineReducers({
    jigsaw: jigsawReducer,
    router: routerReducer
});

export default reducers;
