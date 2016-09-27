import { GET_PARENT_CATS } from '../actions/actionTypes';

const INITIAL_STATE = { parentCats: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_PARENT_CATS:
      return { ...state, parentCats: payload };
    default:
      return state;
  }
}
