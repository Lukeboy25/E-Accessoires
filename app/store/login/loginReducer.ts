import { GOOGLE_LOGIN } from './loginTypes';

const initialState = {
  user: {},
};

export function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case GOOGLE_LOGIN:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
