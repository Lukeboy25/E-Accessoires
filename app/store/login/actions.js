import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_LOGIN } from './types';

export function setGoogleLogin(user) {
  return {
    type: GOOGLE_LOGIN,
    user: user,
  };
}

export const checkForGoogleUser = () => async (dispatch) => {
  const name = await AsyncStorage.getItem('googleName');
  const email = await AsyncStorage.getItem('googleEmail');
  const photoUrl = await AsyncStorage.getItem('googlePhotoUrl');

  return dispatch(setGoogleLogin({ name, email, photoUrl }));
};

export const loginWithGoogle = (googleUser) => async (dispatch) => {
  await AsyncStorage.setItem('googleName', googleUser.name);
  await AsyncStorage.setItem('googleEmail', googleUser.email);
  await AsyncStorage.setItem('googlePhotoUrl', googleUser.photoUrl);

  return dispatch(setGoogleLogin({ name: googleUser.name, email: googleUser.email, photoUrl: googleUser.photoUrl }));
};

export const logOutGoogle = () => async (dispatch) => {
  await AsyncStorage.removeItem('googleName');
  await AsyncStorage.removeItem('googleEmail');
  await AsyncStorage.removeItem('googlePhotoUrl');

  return await dispatch(setGoogleLogin({}));
};
