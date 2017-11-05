import * as types from '../constants/actionTypes';
import initialState from './initialState';

function actionTypeEndWithSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(
  state = initialState.ajaxCallsInProgress,
  action,
) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypeEndWithSuccess(action.type)) {
    return state - 1;
  } else if (action.type == types.AJAX_CALL_ERROR) {
    return state - 1;
  }
  return state;
}
