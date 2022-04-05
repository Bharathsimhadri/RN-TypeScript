import axios from 'axios';
import {
  MOROCCO_ID_FRONT_URL,
  MOROCCO_ID_BACK_URL,
  API_KEY,
} from '../../constant/api-constants';

export async function getFrontPartDataAsync(base64: string) {
  console.log('getFrontPartDataAsync called*****************');
  await axios
    .post(
      MOROCCO_ID_FRONT_URL,
      {"data": base64},
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: API_KEY,
        },
      },
    )
    .then(checkHttpStatus)
    .then(response => {
      console.log(
        'getFrontPartDataAsync*******',
        JSON.stringify(response.data.data),
      );
      if (response) {
        return {};
      }
    })
    .catch(err => {
      console.log('getFrontPartDataAsync error***********',err?.response?.data);
    });
}

export async function getBackPartDataAsync(base64: string) {
  console.log('getBackPartDataAsync called*****************', base64);
  await axios
    .post(
        MOROCCO_ID_BACK_URL,
      {"data": base64},
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: API_KEY,
        },
      },
    )
    .then(checkHttpStatus)
    .then(response => {
      console.log(
        'getBackPartDataAsync*******',
        JSON.stringify(response?.data?.data),
      );
      if (response) {
        return {};
      }
    })
    .catch(err => {
      console.log('getBackPartDataAsync error***********', err?.response?.data);
    });
}

export function checkHttpStatus(response: any) {
  console.log('-------checkHttpStatus--------', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log('---------------', response);
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
