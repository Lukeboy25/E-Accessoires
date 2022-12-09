import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeliveryOption } from '../../entities/DeliveryOption/DeliveryOption';
import { AsyncReduxState, initialAsyncReduxState } from '../AsyncReduxState';

export type DeliveryOptionsState = AsyncReduxState<{
    deliveryOptions?: DeliveryOption[];
}>

const initialState: DeliveryOptionsState = {
    ...initialAsyncReduxState,
    deliveryOptions: [],
};

export const deliveryOptionsSlice = createSlice({
    name: 'deliveryOptionsReducer',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>): DeliveryOptionsState {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setIsSuccessful(state, action: PayloadAction<boolean>): DeliveryOptionsState {
            return {
                ...state,
                isSuccessful: action.payload,
            };
        },
        setDeliveryOptions(state, action: PayloadAction<DeliveryOption[]>): DeliveryOptionsState {
            return {
                ...state,
                deliveryOptions: action.payload,
            };
        },
    },
});

export const {
    setIsLoading,
    setIsSuccessful,
    setDeliveryOptions,
} = deliveryOptionsSlice.actions;

export default deliveryOptionsSlice.reducer;
