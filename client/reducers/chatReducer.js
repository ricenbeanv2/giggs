import { GET_CHAT_HISTORY, POST_MESSAGE } from '../actions/actionTypes';

const INITIAL_STATE = { history: [], recentMsg: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_CHAT_HISTORY:
      return { ...state, history: payload };
    case POST_MESSAGE:
      return { ...state, recentMsg: payload };
    default:
      return state;
  }
}
