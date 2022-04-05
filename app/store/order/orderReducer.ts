import { transformOrderCategoriesToSearchableValue } from './transformOrderCategoryToSearchableValue';
import {
  OPEN_ORDERS, CLOSED_ORDERS, ORDER_PAGES, ORDER_AMOUNT, SET_IS_LOADING, SET_ERROR, ORDER_CATEGORIES,
} from './orderTypes';
import { OrderViewModel } from '../../entities/Order/Order';

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
          (detailorderItem: OrderViewModel) => detailorderItem.orderItems[0].product.title.split('-', 1)[0] === action.search.label,
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
