import { convertCurrency } from 'src/helpers';
import * as types from 'constants/actionTypes';

export const makeExchange = (value, curFrom, curTo) => (dispatch, getState) =>
  dispatch({
    type: types.MAKE_EXCHANGE,
    payload: {
      valFrom: parseFloat(value),
      valTo: parseFloat(convertCurrency(
        value,
        getState().get('Quotations').get(curFrom),
        getState().get('Quotations').get(curTo)
      )),
      curFrom,
      curTo
    }
  });
