import { combineReducers } from 'redux-immutable';
import Quotations from './quotations';
import Balance from './balance';

export default combineReducers({
  Quotations,
  Balance
});
