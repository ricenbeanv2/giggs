import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, GET_CATEGORY } from '../actions/actionTypes';

const INITIAL_STATE = { job: [], joblist: [], created: [], category: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CREATE_JOB:
      return { ...state, created: payload };
    case GET_JOBS:
      return { ...state, job: payload };
    case GET_ALL_JOBS:
      return { ...state, jobList: payload };
    case GET_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
}
