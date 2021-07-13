import { TOKEN, REFRESH_TOKEN, TOKEN_BE } from './types';

const initialState = {
  token: null,
  tokenBE: null,
  refreshToken: null,
};

export function tokenReducer(state = initialState, action) {
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
    case REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    default:
      return state;
  }
}
