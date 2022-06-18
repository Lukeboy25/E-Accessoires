import { OFFER } from './offerTypes';

const initialState = {
    offer: {},
};

export function offerReducer(state = initialState, action: any) {
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
