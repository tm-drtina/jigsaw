import * as types from './action-types';

export function changeFile(dataURL, height, width) {
    return {
        type: types.JIGSAW_CHANGE_FILE,
        dataURL,
        height,
        width
    };
}

export function changeStatus(status) {
    return {
        type: types.JIGSAW_STATUS_CHANGE,
        status
    };
}

export function changeSettings(settings) {
    return {
        type: types.JIGSAW_SETTINGS_CHANGE,
        settings
    };
}
