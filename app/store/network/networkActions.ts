import NetInfo from '@react-native-community/netinfo';
import { Dispatch } from 'redux';

import { SET_HAS_CONNECTION } from './networkTypes';

export const setHasConnection = (hasConnection: boolean) => ({
    type: SET_HAS_CONNECTION,
    hasConnection,
});

export const checkForActiveConnection = () => (dispatch: Dispatch) => {
    NetInfo.addEventListener(state => {
        dispatch(setHasConnection(!!state.isConnected));
    });
};
