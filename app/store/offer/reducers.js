import { OFFER } from './types';

const initialState = {
  offer: {},
};

export function offerReducer(state = initialState, action) {
  switch (action.type) {
    case OFFER:
      return {
        ...state,
        offer: action.offer,
      };
    default:
      return state;
  }
}
