import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER, LOGGED_OUT, GET_PUBLIC_USER } from '../actions/actionTypes';

const INITIAL_STATE = { confirm: '', loggedOut: '', signUp: '', signIn: '', userData: {}, publicUserData: {}, updated: [] };

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
    case GET_PUBLIC_USER:
      return { ...state, publicUserData: payload };
    case GET_USER:
      return { ...state, userData: payload };
    case UPDATE_USER:
      return { ...state, userData: payload };
    default:
      return state;
  }
}
