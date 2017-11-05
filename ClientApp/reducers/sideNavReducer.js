import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function sideNavReducer(state = initialState.sideNav, action) {
  if (action.type == types.OPEN_SIDENAV) {
    return Object.assign({}, state, { open: true });
  } else if (action.type == types.CLOSE_SIDENAV) {
    return Object.assign({}, state, { open: false });
  }
  return state;
}
