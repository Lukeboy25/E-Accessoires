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

      const newArray = new Set(initialState.detailedOpenOrders);
      const uniqueArray = [...newArray];

      const sortedDetailedOrders = uniqueArray.sort((a, b) => a.dateTimeOrderPlaced < b.dateTimeOrderPlaced);

      return {
        ...state,
        detailedOpenOrders: sortedDetailedOrders,
      };
    default:
      return state;
  }
}
