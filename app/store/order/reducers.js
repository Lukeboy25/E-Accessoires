import { OPEN_ORDERS, CLOSED_ORDERS, ORDER_PAGES } from './types';

const initialState = {
  openOrders: [],
  closedOrders: [],
  orderPages: null,
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ORDERS:
      const sortedOpenOrders = action.openOrders.sort((a, b) => a.orderPlacedDateTime > b.orderPlacedDateTime);

      return {
        ...state,
        openOrders: sortedOpenOrders,
      };
    case CLOSED_ORDERS:
      const sortedClosedOrders = action.closedOrders.sort((a, b) => a.orderPlacedDateTime < b.orderPlacedDateTime);

      return {
        ...state,
        closedOrders: sortedClosedOrders,
      };
    case ORDER_PAGES:
      return {
        ...state,
        orderPages: action.orderPages,
      };
    default:
      return state;
  }
}
