import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShippingLabel } from '../../entities/ShippingLabel/ShippingLabel';
import { AsyncReduxState, initialAsyncReduxState } from '../AsyncReduxState';

export type ShippingLabelState = AsyncReduxState<{
    shippingLabel?: ShippingLabel;
}>

const initialState: ShippingLabelState = {
    ...initialAsyncReduxState,
    shippingLabel: undefined,
};

export const shippingLabelSlice = createSlice({
    name: 'shippingLabelReducer',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>): ShippingLabelState {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setIsSuccessful(state, action: PayloadAction<boolean>): ShippingLabelState {
            return {
                ...state,
                isSuccessful: action.payload,
            };
        },
        setShippingLabel(state, action: PayloadAction<ShippingLabel>): ShippingLabelState {
            return {
                ...state,
                shippingLabel: action.payload,
            };
        },
    },
});

export const {
    setIsLoading,
    setIsSuccessful,
    setShippingLabel,
} = shippingLabelSlice.actions;

export default shippingLabelSlice.reducer;
