import * as types from './action-types';

export function changeFile(dataURL, height, width) {
    return {
        type: types.JIGSAW_CHANGE_FILE,
        dataURL,
        height,
        width
    };
}

export function startGame() {
    return {
        type: types.JIGSAW_START_GAME
    };
}
