import { OPEN_ORDERS } from './types';

const initialState = {
  openOrders: [],
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ORDERS:
      return {
        ...state,
        openOrders: action.openOrders,
      };
    default:
      return state;
  }
}
