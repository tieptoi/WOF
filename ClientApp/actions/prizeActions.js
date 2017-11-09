import axios from 'axios';

import * as types from '../constants/actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { showNotificationMessage } from './notificationActions';

export function selectPrize(id) {
  return { type: types.SELECT_PRIZE, id };
}

export function deselectAllPrizes() {
  return { type: types.DESELECT_ALL_PRIZES };
}

export function selectAllPrizes() {
  return { type: types.SELECT_ALL_PRIZES };
}

export function getAllPrizesSuccess(prizes, totalCount) {
  return {
    type: types.GET_ALL_PRIZES_SUCCESS,
    prizes,
    totalCount,
  };
}

export const changePrizePageSuccess = (prizes, page, totalCount) => ({
  type: types.CHANGE_PRIZE_PAGE_SUCCESS,
  prizes,
  page,
  totalCount,
});

export function changePrizePage(page, sortBy, rowPerPage) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const requestUrl = `api/prize?page=${page}&sortBy=${sortBy}&rowPerPage=${rowPerPage}`;
    debugger;
    const request = axios.get(requestUrl);
    return request.then(
      response =>
        dispatch(changePrizePageSuccess(
          response.data,
          page,
          Number(response.headers['x-total-count']),
        )),
      (err) => {
        dispatch(ajaxCallError());
        dispatch(showNotificationMessage(err.message));
        throw err;
      },
    );
  };
}

export function getAllPrizes() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    const request = axios.get('/api/prize');
    return request.then(
      response =>
        dispatch(getAllPrizesSuccess(
          response.data,
          Number(response.headers['x-total-count']),
        )),
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
      (response) => {
        dispatch(getPrizeSuccess(response.data));
      },
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
        dispatch(deselectAllPrizes());
        dispatch(showNotificationMessage('Prize is deleted !!'));
      })
      .catch((err) => {
        dispatch(ajaxCallError());
        throw err;
      });
  };
}
