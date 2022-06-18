import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';

import { GoogleUserViewModel } from '../../entities/GoogleUser/GoogleUserViewModel';
import { GOOGLE_LOGIN, SET_IS_LOADING } from './loginTypes';

export function setIsLoading(isLoading: boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading,
    };
}

export function setGoogleLogin(user: object) {
    return {
        type: GOOGLE_LOGIN,
        user,
    };
}

export const checkForGoogleUser = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    const name = await AsyncStorage.getItem('googleName');
    const email = await AsyncStorage.getItem('googleEmail');
    const photoUrl = await AsyncStorage.getItem('googlePhotoUrl');

    dispatch(setIsLoading(false));

    return dispatch(setGoogleLogin({ name, email, photoUrl }));
};

export const loginWithGoogle = (googleUser: GoogleUserViewModel) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    if (googleUser.name) {
        await AsyncStorage.setItem('googleName', googleUser.name);
    }

    if (googleUser.email) {
        await AsyncStorage.setItem('googleEmail', googleUser.email);
    }

    if (googleUser.photoUrl) {
        await AsyncStorage.setItem('googlePhotoUrl', googleUser.photoUrl);
    }

    dispatch(setIsLoading(false));

    return dispatch(setGoogleLogin({ name: googleUser.name, email: googleUser.email, photoUrl: googleUser.photoUrl }));
};

export const logOutGoogle = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    await AsyncStorage.removeItem('googleName');
    await AsyncStorage.removeItem('googleEmail');
    await AsyncStorage.removeItem('googlePhotoUrl');

    dispatch(setIsLoading(false));

    return dispatch(setGoogleLogin({}));
};
