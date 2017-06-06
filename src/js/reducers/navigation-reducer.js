import * as types from '../actions/action-types';

const initialState = {
    menuOpen: false
};

export default function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case types.NAVIGATION_MENU_TOGGLE:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });
        default:
            return state;
    }
}
