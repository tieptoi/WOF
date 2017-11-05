import * as types from '../constants/actionTypes';

export function showNotificationMessage(message) {
  return { type: types.SHOW_NOTIFICATION_MESSAGE, message };
}

export function closeNotificationMessage() {
  return { type: types.CLOSE_NOTIFICATION_MESSAGE };
}
