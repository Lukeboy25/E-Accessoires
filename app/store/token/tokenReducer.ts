import { TOKEN, TOKEN_BE } from './tokenTypes';

const initialState = {
    token: null,
    tokenBE: null,
};

export function tokenReducer(state = initialState, action: any) {
    switch (action.type) {
        case TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case TOKEN_BE:
            return {
                ...state,
                tokenBE: action.tokenBE,
            };
        default:
            return state;
    }
}
