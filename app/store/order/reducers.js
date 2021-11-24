import { OPEN_ORDERS, CLOSED_ORDERS } from './types';

const initialState = {
  openOrders: [],
  closedOrders: [],
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ORDERS:
      const sortedOpenOrders = action.openOrders.sort((a, b) => a.dateTimeOrderPlaced < b.dateTimeOrderPlaced);

      return {
        ...state,
        openOrders: sortedOpenOrders,
      };
    case CLOSED_ORDERS:
      const sortedClosedOrders = action.closedOrders.sort((a, b) => a.dateTimeOrderPlaced > b.dateTimeOrderPlaced);

      return {
        ...state,
        closedOrders: sortedClosedOrders,
      };
    default:
      return state;
  }
}
