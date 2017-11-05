import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function prizesReducer(state = initialState.prizes, action) {
  switch (action.type) {
    case types.GET_ALL_PRIZES_SUCCESS:
      return Object.assign([], [...state], [...action.prizes]);
    case types.CREATE_PRIZE_SUCCESS: {
      let newState = state.slice();
      newState = newState.concat(action.prize);
      return newState;
    }
    case types.UPDATE_PRIZE_SUCCESS:
    case types.GET_PRIZE_SUCCESS: {
      // Use 'slice' to make a copy of state to avoid mutating it
      let newState = state.slice();
      const index = newState.findIndex(prize => prize.id == action.prize.id);
      if (index < 0) {
        // Use 'concat' to add new object to new state
        newState = newState.concat(action.prize);
      } else {
        // Use 'splice' to remove the index then insert the new object to that index
        newState.splice(index, 1, action.prize);
      }
      return newState;
    }
    case types.DELETE_PRIZE_SUCCESS: {
      const newState = state.slice();
      const index = newState.findIndex(prize => prize.id == action.prize.id);
      if (index >= 0) {
        newState.splice(index, 1);
      }
      return newState;
    }
    default:
      return state;
  }
}
