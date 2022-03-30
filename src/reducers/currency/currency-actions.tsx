import {
  FETCH_CURRENCY_FAILURE,
  FETCH_CURRENCY_SUCCESS,
} from './currency-constants';

export function GetCurrencyListSuccess(Payload = {}) {
  return {
    type: FETCH_CURRENCY_SUCCESS,
    payload: Payload,
  };
}
export function GetCurrencyListFailure(Payload = {}) {
  return {
    type: FETCH_CURRENCY_FAILURE,
    payload: Payload,
  };
}
