import { APPLY_JOB, CANCEL_APP, UPDATE_BID, GET_APPLICANTS, QUERY_APP, UPDATE_STATUS, GET_EMPLOYERS, GET_EMPLOYEES, REJECT_ALL } from '../actions/actionTypes';

const INITIAL_STATE = { apply: {}, cancel: '', update: '', applicants: [], status: '', entry: '', employers: [], employees: [], reject: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case APPLY_JOB:
      return { ...state, apply: payload };
    case GET_EMPLOYERS:
      return { ...state, employers: payload };
    case GET_EMPLOYEES:
      return { ...state, employees: payload };
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
    case REJECT_ALL:
      return { ...state, reject: payload };
    default:
      return state;
  }
}
