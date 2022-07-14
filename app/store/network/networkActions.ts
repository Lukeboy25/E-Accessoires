import NetInfo from '@react-native-community/netinfo';
import { Dispatch } from 'redux';

import { setHasConnection } from './networkReducer';

export const checkForActiveConnection = () => (dispatch: Dispatch) => {
    NetInfo.addEventListener(state => {
        dispatch(setHasConnection(!!state.isConnected));
    });
};
