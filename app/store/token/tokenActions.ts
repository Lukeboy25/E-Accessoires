import Axios from 'axios';
import {
  CLIENT_ID, 
  CLIENT_SECRET,
  CLIENT_ID_BE,
  CLIENT_SECRET_BE,
} from 'react-native-dotenv';
import { Dispatch } from 'redux';
import { TOKEN, TOKEN_BE } from './tokenTypes';
import { TokenViewModel } from '../../entities/Token/Token';

export function setTokenNL(token: TokenViewModel) {
  return {
    type: TOKEN,
    token,
  };
}

export function setTokenBE(tokenBE: TokenViewModel) {
  return {
    type: TOKEN_BE,
    tokenBE,
  };
}

export const logOut = () => async (dispatch: Dispatch) => {
  dispatch(setTokenNL(null));
  dispatch(setTokenBE(null));
};

const requestToken = (clientId: string, clientSecret: string) => async () => {
  const requestBody = new URLSearchParams();
  requestBody.append('client_id', clientId);
  requestBody.append('client_secret', clientSecret);
  requestBody.append('grant_type', 'client_credentials');

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  return (
    await Axios.post('https://login.bol.com/token', requestBody, { headers })
  ).data;
};

export const requestTokenNL = () => async (dispatch: Dispatch) => {
  const token = await dispatch(requestToken(CLIENT_ID, CLIENT_SECRET));

  if (!token.access_token) return null;
  dispatch(setTokenNL(token.access_token));

  return token.access_token;
};

export const requestTokenBE = () => async (dispatch: Dispatch) => {
  const token = await dispatch(requestToken(CLIENT_ID_BE, CLIENT_SECRET_BE));

  if (!token.access_token) return null;
  dispatch(setTokenBE(token.access_token));

  return token.access_token;
};
