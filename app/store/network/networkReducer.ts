import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AsyncReduxState, initialAsyncReduxState } from '../AsyncReduxState';

export type NetworkState = AsyncReduxState<{
    hasConnection: boolean;
}>

const initialState: NetworkState = {
    ...initialAsyncReduxState,
    hasConnection: true,
};

export const networkSlice = createSlice({
    name: 'networkReducer',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>): NetworkState {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setIsSuccessful(state, action: PayloadAction<boolean>): NetworkState {
            return {
                ...state,
                isSuccessful: action.payload,
            };
        },
        setHasConnection(state, action: PayloadAction<boolean>): NetworkState {
            return {
                ...state,
                hasConnection: action.payload,
            };
        },
    },
});

export const {
    setIsLoading,
    setIsSuccessful,
    setHasConnection,
} = networkSlice.actions;

export default networkSlice.reducer;
