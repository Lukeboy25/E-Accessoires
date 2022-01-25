import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_LOGIN } from './loginTypes';
import { GoogleUserViewModel } from '../../entities/GoogleUser/GoogleUserViewModel';
import {Dispatch} from "redux";

export function setGoogleLogin(user: {}) {
  return {
    type: GOOGLE_LOGIN,
    user: user,
  };
}

export const checkForGoogleUser = () => async (dispatch: Dispatch) => {
  const name = await AsyncStorage.getItem('googleName');
  const email = await AsyncStorage.getItem('googleEmail');
  const photoUrl = await AsyncStorage.getItem('googlePhotoUrl');

  return dispatch(setGoogleLogin({ name, email, photoUrl }));
};

export const loginWithGoogle = (googleUser: GoogleUserViewModel) => async (dispatch: Dispatch) => {
  googleUser.name && await AsyncStorage.setItem('googleName', googleUser.name);
  googleUser.email && await AsyncStorage.setItem('googleEmail', googleUser.email);
  googleUser.photoUrl && await AsyncStorage.setItem('googlePhotoUrl', googleUser.photoUrl);

  return dispatch(setGoogleLogin({ name: googleUser.name, email: googleUser.email, photoUrl: googleUser.photoUrl }));
};

export const logOutGoogle = () => async (dispatch: Dispatch) => {
  await AsyncStorage.removeItem('googleName');
  await AsyncStorage.removeItem('googleEmail');
  await AsyncStorage.removeItem('googlePhotoUrl');

  return dispatch(setGoogleLogin({}));
};
