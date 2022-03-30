import {
  FETCH_CURRENCY_FAILURE,
  FETCH_CURRENCY_SUCCESS,
} from './currency-constants';

type Action = {
  type: string;
  payload?: any;
};

export default function currencyReducer(state: {}, action: Action) {
  switch (action.type) {
    case FETCH_CURRENCY_SUCCESS:
      return {
        ...state,
        GetCurrencySuccess: action.payload,
        GetCurrencyFailure: null,
      };
    case FETCH_CURRENCY_FAILURE:
      return {
        ...state,
        GetCurrencySuccess: null,
        GetCurrencyFailure: action.payload,
      };
    default: {
      console.log('currencyReducer default ***********');
      return null;
    }
  }
}
