import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function notificationReducer(state = initialState.notification, action) {
  if (action.type == types.SHOW_NOTIFICATION_MESSAGE) {
    return Object.assign({}, state, { message: action.message, showMessage: true });
  } else if (action.type == types.CLOSE_NOTIFICATION_MESSAGE) {
    return Object.assign({}, state, { message: '', showMessage: false });
  }
  return state;
}
