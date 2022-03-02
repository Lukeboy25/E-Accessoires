import { SET_IS_LOADING, SHIPMENTS } from './shipmentTypes';

const initialState = {
  shipments: [],

  isLoading: false,
};

export function shipmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SHIPMENTS:
      return {
        ...state,
        shipments: action.shipments,
      };
    default:
      return state;
  }
}
