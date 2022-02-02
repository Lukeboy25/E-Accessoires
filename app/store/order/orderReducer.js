import {
  OPEN_ORDERS, CLOSED_ORDERS, ORDER_PAGES, ORDER_AMOUNT, SET_IS_LOADING, SET_ERROR,
} from './types';

const initialState = {
  openOrders: [],
  closedOrders: [],
  orderPages: null,
  orderAmount: 0,

  error: '',
  isLoading: false,
};

export function orderReducer(state = initialState, action) {
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
    case OPEN_ORDERS:
      return {
        ...state,
        openOrders: action.openOrders,
      };
    case CLOSED_ORDERS:
      return {
        ...state,
        closedOrders: action.closedOrders,
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
