import { APPLY_JOB, CANCEL_JOB, UPDATE_BID, GET_APPLICANTS, UPDATE_STATUS, GET_EMPLOYERS, GET_EMPLOYEES } from '../actions/actionTypes';

const INITIAL_STATE = { apply: {}, cancel: '', update: '', applicants: [], status: '', employers: [], employees: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case APPLY_JOB:
      return { ...state, apply: payload };
    case GET_EMPLOYERS:
      return { ...state, employers: payload };
    case GET_EMPLOYEES:
      return { ...state, employees: payload };
    case CANCEL_JOB:
      return { ...state, cancel: payload };
    case UPDATE_BID:
      return { ...state, update: payload };
    case GET_APPLICANTS:
      return { ...state, applicants: payload };
    case UPDATE_STATUS:
      return { ...state, status: payload };
    default:
      return state;
  }
}
