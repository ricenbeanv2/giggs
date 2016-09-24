import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER, LOGGED_OUT } from '../actions/actionTypes';

export default function (state = {}, { type, payload }) {
  switch (type) {
    case PW_NOT_SAME:
      return payload;
    case LOGGED_OUT:
      return {};
    case SIGN_UP:
      return payload;
    case SIGN_IN:
      return payload;
    case GET_USER:
      return payload;
    case UPDATE_USER:
      return payload;
    default:
      return state;
  }
}
