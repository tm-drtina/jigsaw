import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import jigsawReducer from './jigsaw-reducer';
import navigationReducer from './navigation-reducer';

// Combine Reducers
const reducers = combineReducers({
    jigsaw: jigsawReducer,
    navigation: navigationReducer,
    router: routerReducer
});

export default reducers;
