import Axios from 'axios';
import {
  CLIENT_ID, CLIENT_SECRET, CLIENT_ID_BE, CLIENT_SECRET_BE,
} from 'react-native-dotenv';
import { TOKEN, TOKEN_BE } from './types';

export function setTokenNL(token) {
  return {
    type: TOKEN,
    token,
  };
}

export function setTokenBE(tokenBE) {
  return {
    type: TOKEN_BE,
    tokenBE,
  };
}

export const logOut = () => async (dispatch) => {
  dispatch(setTokenNL(null));
  dispatch(setTokenBE(null));
};

export const requestTokenNL = () => async (dispatch) => {
  const { access_token } = await dispatch(requestToken(CLIENT_ID, CLIENT_SECRET));

  if (!access_token) return;
  dispatch(setTokenNL(access_token));

  return access_token;
};

export const requestTokenBE = () => async (dispatch) => {
  const { access_token } = await dispatch(requestToken(CLIENT_ID_BE, CLIENT_SECRET_BE));

  if (!access_token) return;
  dispatch(setTokenBE(access_token));

  return access_token;
};

const requestToken = (clientId, clientSecret) => async () => {
  const requestBody = new URLSearchParams();
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);
  requestBody.append('grant_type', 'client_credentials');

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  return await (
    await Axios.post('https://login.bol.com/token', requestBody, { headers })
  ).data;
};
