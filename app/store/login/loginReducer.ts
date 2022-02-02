import { GOOGLE_LOGIN, SET_IS_LOADING } from './loginTypes';

const initialState = {
  user: {},
};

export function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GOOGLE_LOGIN:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
