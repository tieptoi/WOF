import * as types from '../constants/actionTypes';

export function openSideNav() {
  return { type: types.OPEN_SIDENAV };
}

export function closeSideNav() {
  return { type: types.CLOSE_SIDENAV };
}
