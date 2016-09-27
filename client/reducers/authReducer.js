import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER, LOGGED_OUT } from '../actions/actionTypes';

const INITIAL_STATE = { confirm: '', loggedOut: '', signUp: '', signIn: '', userData: {}, updated: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case PW_NOT_SAME:
      return { ...state, confirm: payload };
    case LOGGED_OUT:
      return { ...state, loggedOut: payload };
    case SIGN_UP:
      return { ...state, signUp: payload };
    case SIGN_IN:
      return { ...state, signIn: payload };
    case GET_USER:
      return { ...state, userData: payload };
    case UPDATE_USER:
      return { ...state, updated: payload };
    default:
      return state;
  }
}
