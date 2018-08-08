import Axios from 'axios';
import * as types from '../constants/actionTypes';

const quotationsLink = 'https://www.cbr-xml-daily.ru/daily_json.js';

export const updateQuotations = () => (dispatch) =>
  Axios.get(quotationsLink).then((response) => dispatch({
    type: types.SET_QUOTATIONS,
    payload: response.data.Valute
  }));

