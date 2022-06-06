import { SET_HAS_CONNECTION } from './networkTypes';
import { Dispatch } from 'redux';
import NetInfo from '@react-native-community/netinfo';

export const setHasConnection = (hasConnection: boolean) => {
    return {
        type: SET_HAS_CONNECTION,
        hasConnection,
    };
};

export const checkForActiveConnection = () => (dispatch: Dispatch) => {
    NetInfo.addEventListener(state => {
        dispatch(setHasConnection(state.isConnected));
    });
};