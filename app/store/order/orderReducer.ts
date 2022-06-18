import { OrderViewModel } from '../../entities/Order/Order';
import { transformOrderCategoriesToSearchableValue } from './helpers/transformOrderCategoryToSearchableValue';
import {
    CLOSED_ORDERS,
    OPEN_ORDERS,
    ORDER_AMOUNT,
    ORDER_CATEGORIES,
    ORDER_PAGES,
    SET_ERROR,
    SET_IS_LOADING,
} from './orderTypes';

const initialState = {
    openOrders: [],
    closedOrders: [],
    orderCategories: [],
    orderPages: null,
    orderAmount: 0,

    error: '',
    isLoading: false,
};

export function orderReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case OPEN_ORDERS: {
            const filteredOrders = action.search
        ? action.openOrders.filter(
            (detailorderItem: OrderViewModel) => detailorderItem.orderItems[0].product.title.split('-', 1)[0].trim() === action.search,
        )
        : action.openOrders;

            return {
                ...state,
                openOrders: filteredOrders,
            };
        }
        case CLOSED_ORDERS:
            return {
                ...state,
                closedOrders: action.closedOrders,
            };
        case ORDER_CATEGORIES:
            return {
                ...state,
                orderCategories: action.orderCategories.map((value: string, index: string) => transformOrderCategoriesToSearchableValue(value, index)),
            };
        case ORDER_PAGES:
            return {
                ...state,
                orderPages: action.orderPages,
            };
        case ORDER_AMOUNT:
            return {
                ...state,
                orderAmount: action.orderAmount,
            };
        default:
            return state;
    }
}
