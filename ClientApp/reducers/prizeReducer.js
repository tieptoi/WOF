import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function prizesReducer(state = initialState.prize, action) {
  switch (action.type) {
    case types.GET_ALL_PRIZES_SUCCESS:
      return Object.assign({}, state, { prizes: action.prizes });
    case types.CREATE_PRIZE_SUCCESS: {
      let newState = state.prizes.slice();
      newState = newState.concat(action.prize);
      return Object.assign({}, state, { prizes: newState });
    }
    case types.UPDATE_PRIZE_SUCCESS:
    case types.GET_PRIZE_SUCCESS: {
      // Use 'slice' to make a copy of state to avoid mutating it
      let newState = state.prizes.slice();
      const index = newState.findIndex(prize => prize.id == action.prize.id);
      if (index < 0) {
        // Use 'concat' to add new object to new state
        newState = newState.concat(action.prize);
      } else {
        // Use 'splice' to remove the index then insert the new object to that index
        newState.splice(index, 1, action.prize);
      }
      return Object.assign({}, state, { prizes: newState });
    }
    case types.DELETE_PRIZE_SUCCESS: {
      const newState = state.prizes.slice();
      const index = newState.findIndex(prize => prize.id == action.prize.id);
      if (index >= 0) {
        newState.splice(index, 1);
      }
      return Object.assign({}, state, { prizes: newState });
    }
    case types.DESELECT_ALL_PRIZES:
      return Object.assign({}, state, {
        selectedPrizes: [],
        isAllPrizesSelected: false,
      });
    case types.SELECT_ALL_PRIZES: {
      const newState = state.prizes.map(prize => prize.id);
      return Object.assign({}, state, {
        selectedPrizes: newState,
        isAllPrizesSelected: true,
      });
    }
    case types.SELECT_PRIZE: {
      let newState = state.selectedPrizes.slice();
      const index = newState.indexOf(action.id);
      if (index >= 0) {
        newState.splice(newState.indexOf(action.id), 1);
      } else {
        newState = newState.concat(action.id);
      }
      return Object.assign({}, state, {
        selectedPrizes: newState,
      });
    }
    default:
      return state;
  }
}
