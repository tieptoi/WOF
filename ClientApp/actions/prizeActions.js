import axios from 'axios';

import * as types from '../constants/actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { showNotificationMessage } from './notificationActions';

export function getAllPrizesSuccess(prizes) {
  return {
    type: types.GET_ALL_PRIZES_SUCCESS,
    prizes,
  };
}

export function getAllPrizes() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.get('/api/prize');
    return request.then(
      response => dispatch(getAllPrizesSuccess(response.data)),
      (err) => {
        dispatch(ajaxCallError());
        dispatch(showNotificationMessage(err.message));
        throw err;
      },
    );
  };
}

export function getPrizeSuccess(prize) {
  return {
    type: types.GET_PRIZE_SUCCESS,
    prize,
  };
}

export function getPrize(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.get(`/api/prize/${id}`);
    return request.then(
      response => dispatch(getPrizeSuccess(response.data)),
      (err) => {
        dispatch(ajaxCallError());
        dispatch(showNotificationMessage('Invalid Prize ID !!'));
        throw err;
      },
    );
  };
}
export function updatePrizeSuccess(prize) {
  return { type: types.UPDATE_PRIZE_SUCCESS, prize };
}

export function updatePrize(prize) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.put(`/api/prize/${prize.id}`, prize);
    return request.then(
      () => {
        dispatch(updatePrizeSuccess(prize));
        dispatch(showNotificationMessage('Prize is saved !!'));
      },
      (err) => {
        dispatch(ajaxCallError());
        throw err;
      },
    );
  };
}

export function createPrizeSuccess(prize) {
  return { type: types.CREATE_PRIZE_SUCCESS, prize };
}

export function createPrize(prize) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.post('api/prize', prize);
    return request
      .then((response) => {
        dispatch(createPrizeSuccess(response.data));
        dispatch(showNotificationMessage('Prize is created !!'));
      })
      .catch((err) => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}

export function deletePrizeSuccess(prize) {
  return { type: types.DELETE_PRIZE_SUCCESS, prize };
}

export function deletePrize(prize) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.delete(`api/prize/${prize.id}`);
    return request
      .then(() => {
        dispatch(deletePrizeSuccess(prize));
        dispatch(showNotificationMessage('Prize is deleted !!'));
      })
      .catch((err) => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}
