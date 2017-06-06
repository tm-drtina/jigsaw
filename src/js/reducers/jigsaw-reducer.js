import * as types from '../actions/action-types';
import config, { gameStatus } from '../config';

const initialState = {
    dataURL: config.noImage,
    height: 0,
    width: 0,
    status: gameStatus.INIT
};

export default function jigsawReducer(state = initialState, action) {
    switch (action.type) {
        case types.JIGSAW_CHANGE_FILE:
            return Object.assign({}, state, {
                dataURL: action.dataURL,
                height: action.height,
                width: action.width,
                status: gameStatus.LOADED
            });
        case types.JIGSAW_STATUS_CHANGE:
            return Object.assign({}, state, {
                status: action.status
            });
        default:
            return state;
    }
}
