import { Map, List } from 'immutable';
import * as types from 'constants/actionTypes';

const initialState = Map({
  preferred: List(['RUB', 'USD', 'EUR', 'GBP']),
  values: Map({
    RUB: 6000,
    USD: 500,
    EUR: 50,
    GBP: 0
  })
});

const quotations = (state = initialState, action) => {
  switch (action.type) {
    case types.MAKE_EXCHANGE:
      state = state.setIn(
        ['values', action.payload.curFrom],
        state.getIn(['values', action.payload.curFrom]) - action.payload.valFrom
      );

      state = state.setIn(
        ['values', action.payload.curTo],
        state.getIn(['values', action.payload.curTo]) + action.payload.valTo
      );

      return state;

    default:
      return state;
  }
};

export default quotations;
