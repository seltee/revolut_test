import { Map } from 'immutable';
import * as types from '../constants/ActionTypes';

const initialState = Map({
  RUB: 1
});

const quotations = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUOTATIONS:
      Object.values(action.payload).forEach((element) => {
        state = state.set(element.CharCode, element.Value);
      });
      return state;

    default:
      return state;
  }
};

export default quotations;
