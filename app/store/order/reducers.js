import { OPEN_ORDERS, ORDER } from './types';

const initialState = {
  detailedOpenOrders: [],
  openOrders: [],
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ORDERS:
      return {
        ...state,
        openOrders: action.openOrders,
      };
    case ORDER:
      initialState.detailedOpenOrders.push(action.order);

      return {
        ...state,
        detailedOpenOrders: Array.from([...new Set(initialState.detailedOpenOrders)]),
      };
    default:
      return state;
  }
}
