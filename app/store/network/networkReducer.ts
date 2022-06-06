import { SET_HAS_CONNECTION } from './networkTypes';

const initialState = {
    hasConnection: true,
};

export const networkReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_HAS_CONNECTION:
            return {
                ...state,
                hasConnection: action.hasConnection,
            };
        default:
            return state;
    };
};
