import * as types from './action-types';

export function setMenuOpen(open) {
    return {
        type: types.NAVIGATION_MENU_TOGGLE,
        open
    };
}
