import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SearchableOption } from '../../compositions/types';
import { OrderViewModel } from '../../entities/Order/Order';
import { AsyncReduxState, initialAsyncReduxState } from '../AsyncReduxState';

export type OrderState = AsyncReduxState<{
    openOrders: OrderViewModel[];
    closedOrders: OrderViewModel[];
    orderCategories: SearchableOption[];
    orderPages: number;
    orderAmount: number;
    search?: string;
}>

const initialState: OrderState = {
    ...initialAsyncReduxState,
    openOrders: [],
    closedOrders: [],
    orderCategories: [],
    orderPages: 1,
    orderAmount: 0,
};

export const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>): OrderState {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setIsSuccessful(state, action: PayloadAction<boolean>): OrderState {
            return {
                ...state,
                isSuccessful: action.payload,
            };
        },
        setError(state, action: PayloadAction<string>): OrderState {
            return {
                ...state,
                error: action.payload,
            };
        },
        setOpenOrders(state, action: PayloadAction<OrderViewModel[]>): OrderState {
            const filteredOpenOrders = state.search
                ? action.payload.filter((detailOrderItem: OrderViewModel) => detailOrderItem.orderItems[0].product.title.split('-', 1)[0].trim() === state.search)
                : action.payload;

            return {
                ...state,
                openOrders: filteredOpenOrders,
            };
        },
        setClosedOrders(state, action: PayloadAction<OrderViewModel[]>): OrderState {
            return {
                ...state,
                closedOrders: action.payload,
            };
        },
        setOrderCategories(state, action: PayloadAction<SearchableOption[]>): OrderState {
            return {
                ...state,
                orderCategories: action.payload,
            };
        },
        setOrderPages(state, action: PayloadAction<number>): OrderState {
            return {
                ...state,
                orderPages: action.payload,
            };
        },
        setOrderAmount(state, action: PayloadAction<number>): OrderState {
            return {
                ...state,
                orderAmount: action.payload,
            };
        },
        setSearch(state, action: PayloadAction<string | undefined>): OrderState {
            return {
                ...state,
                search: action.payload,
            };
        },
    },
});

export const {
    setIsLoading,
    setIsSuccessful,
    setError,
    setOpenOrders,
    setClosedOrders,
    setOrderCategories,
    setOrderPages,
    setOrderAmount,
    setSearch,
} = orderSlice.actions;

export default orderSlice.reducer;
