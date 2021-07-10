import Axios from 'axios';
import { REFRESH_TOKEN, TOKEN } from './types';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';

export function setToken(token) {
  return {
    type: TOKEN,
    token: token,
  };
}

export function setRefreshToken(token) {
  return {
    type: REFRESH_TOKEN,
    refreshToken: token,
  };
}

export const logOut = () => async (dispatch) => {
  setToken(null);
  setRefreshToken(null);
};

export const refresh = () => async (dispatch, getState) => {
  const state = getState();
  let refreshToken = state.token.refreshToken;
  if (!refreshToken) return;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const { access_token } = await (await Axios.post('https://login.bol.com/token', refreshToken, { headers })).data;
  if (!access_token) return;
  dispatch(setToken(access_token));
  // if (refresh_token) {
  //   dispatch(setRefreshToken(refresh_token));
  // }
  return token;
};

export const requestToken = () => async (dispatch) => {
  const requestBody = new URLSearchParams();
  requestBody.append('client_id', CLIENT_ID);
  requestBody.append('client_secret', CLIENT_SECRET);
  requestBody.append('grant_type', 'client_credentials');

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const { access_token } = await (await Axios.post('https://login.bol.com/token', requestBody, { headers })).data;

  if (!access_token) return;
  dispatch(setToken(access_token));
  dispatch(setRefreshToken(access_token));

  return access_token;
};
