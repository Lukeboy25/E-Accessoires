import { OPEN_ORDERS } from './types';

const initialState = {
  openOrders: [],
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ORDERS:
      const sortedOpenOrders = action.openOrders.sort((a, b) => a.dateTimeOrderPlaced < b.dateTimeOrderPlaced);

      return {
        ...state,
        openOrders: sortedOpenOrders,
      };
    default:
      return state;
  }
}
