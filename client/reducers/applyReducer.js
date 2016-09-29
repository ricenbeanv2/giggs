import { APPLY_JOB, CANCEL_JOB, UPDATE_BID, GET_APPLICANTS } from '../actions/actionTypes';

const INITIAL_STATE = { apply: {}, cancel: '', update: '', applicants: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case APPLY_JOB:
      return { ...state, apply: payload };
    case CANCEL_JOB:
      return { ...state, cancel: payload };
    case UPDATE_BID:
      return { ...state, update: payload };
    case GET_APPLICANTS:
      return { ...state, applicants: payload };
    default:
      return state;
  }
}
