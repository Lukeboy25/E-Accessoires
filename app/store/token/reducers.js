import { TOKEN, REFRESH_TOKEN } from './types';

const initialState = {
  token: null,
  refreshToken: null,
};

export function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.token,
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
