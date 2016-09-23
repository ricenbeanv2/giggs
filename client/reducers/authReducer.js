import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER } from '../actions/actionTypes';

export default function (state = '', action) {
  switch (action.type) {
    case PW_NOT_SAME:
      return action.payload;
    case SIGN_UP:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case GET_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
}
