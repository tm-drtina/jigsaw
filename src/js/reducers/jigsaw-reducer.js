import * as types from '../actions/action-types';

const initialState = {
    dataURL: '',
    height: 0,
    width: 0,
    gameStarted: false
};

export default function jigsawReducer(state = initialState, action) {
    switch (action.type) {
        case types.JIGSAW_CHANGE_FILE:
            return Object.assign({}, state, {
                dataURL: action.dataURL,
                height: action.height,
                width: action.width,
                gameStarted: false
            });
        case types.JIGSAW_START_GAME:
            return Object.assign({}, state, {
                gameStarted: true
            });
        default:
            return state;
    }
}
