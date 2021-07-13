import Axios from 'axios';
import { REFRESH_TOKEN, TOKEN, TOKEN_BE } from './types';
import { CLIENT_ID, CLIENT_SECRET, CLIENT_ID_BE, CLIENT_SECRET_BE } from 'react-native-dotenv';

export function setTokenNL(token) {
  return {
    type: TOKEN,
    token: token,
  };
}

export function setTokenBE(tokenBE) {
  return {
    type: TOKEN_BE,
    tokenBE: tokenBE,
  };
}

export function setRefreshToken(token) {
  return {
    type: REFRESH_TOKEN,
    refreshToken: token,
  };
}

export const logOut = () => async (dispatch) => {
  dispatch(setTokenNL(null));
  dispatch(setTokenBE(null));
  dispatch(setRefreshToken(null));
};

export const refresh = () => async (dispatch, getState) => {
  const state = getState();
  let refreshToken = state.token.refreshToken;
  if (!refreshToken) return;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const { access_token } = await (await Axios.post('https://login.bol.com/token', refreshToken, { headers })).data;
  if (!access_token) return;
  dispatch(setTokenNL(access_token));
  // if (refresh_token) {
  //   dispatch(setRefreshToken(refresh_token));
  // }
  return token;
};

export const requestTokenNL = () => async (dispatch) => {
  const { access_token } = await dispatch(requestToken(CLIENT_ID, CLIENT_SECRET));

  if (!access_token) return;
  dispatch(setTokenNL(access_token));
  dispatch(setRefreshToken(access_token));

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
