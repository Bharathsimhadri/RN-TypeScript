import {combineReducers} from 'redux';
import currencyReducer from './currency/currency-reducer';

const rootReducer = combineReducers({
  currencyReducer,
});

export default rootReducer;
