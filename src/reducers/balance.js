import { Map, List } from 'immutable';

const initialState = Map({
  preferred: List(['RUB', 'USD', 'EUR', 'GBP']),
  values: Map({
    RUB: 6000,
    USD: 500,
    EUR: 50
  })
});

const quotations = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default quotations;
