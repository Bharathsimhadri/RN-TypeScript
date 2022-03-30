import axios from 'axios';
import {
  GetCurrencyListFailure,
  GetCurrencyListSuccess,
} from '../../reducers/currency/currency-actions';
import {GET_CURRENCY_URL} from '../../constant/api-constants';

type dispatch = any;
export function getCurrencyList() {
  return async (dispatch: dispatch) => {
    await axios
      .get(GET_CURRENCY_URL)
      .then(response => {
        //console.log('getCurrencyList*******', JSON.stringify(response.data.data));
        if (response) {
          dispatch(GetCurrencyListSuccess(response.data.data));
        }
      })
      .catch(err => {
        dispatch(
          GetCurrencyListFailure({
            err,
          }),
        );
        console.log('error***********', err);
      });
  };
}
