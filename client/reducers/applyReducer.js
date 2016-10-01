import { APPLY_JOB, CANCEL_APP, UPDATE_BID, GET_APPLICANTS, UPDATE_STATUS, QUERY_APP } from '../actions/actionTypes';

const INITIAL_STATE = { apply: {}, cancel: '', update: '', applicants: [], status: '', entry: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case APPLY_JOB:
      return { ...state, apply: payload };
    case CANCEL_APP:
      return { ...state, cancel: payload };
    case UPDATE_BID:
      return { ...state, update: payload };
    case GET_APPLICANTS:
      return { ...state, applicants: payload };
    case UPDATE_STATUS:
      return { ...state, status: payload };
    case QUERY_APP:
      return { ...state, entry: payload };
    default:
      return state;
  }
}
