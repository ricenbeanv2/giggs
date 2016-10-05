import { GET_PARENT_CATS, GET_CHILDREN_CATS } from '../actions/actionTypes';

const INITIAL_STATE = { parentCats: [], childCats: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_PARENT_CATS:
      return { ...state, parentCats: payload };
    case GET_CHILDREN_CATS:
      return { ...state, childCats: payload };
    default:
      return state;
  }
}
