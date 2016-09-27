import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS } from '../actions/actionTypes';

const INITIAL_STATE = { job: [], joblist: [], created: [] };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CREATE_JOB:
      return { ...state, created: payload };
    case GET_JOBS:
      return { ...state, job: payload };
    case GET_ALL_JOBS:
      return { ...state, jobList: payload };
    default:
      return state;
  }
}
