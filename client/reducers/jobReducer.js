import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, SORT_PRICE, SORT_CATEGORIES, SORT_DATE, FILTER_CATEGORY, SET_JOBID, GET_LAT_LONG, CANCEL_JOB, GET_PROFILE_JOBS } from '../actions/actionTypes';

const INITIAL_STATE = { job: [], jobList: [], created: [], category: [], latLong: {}, jobId: '', cancelJob: '', jobsProfile: []};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CREATE_JOB:
      return { ...state, created: payload };
    case GET_JOBS:
      return { ...state, job: payload };
    case GET_ALL_JOBS:
      return { ...state, jobList: payload };
    case GET_LAT_LONG:
      return { ...state, latLong: payload };
    case SORT_CATEGORIES:
      return { ...state, jobList: payload };
    case SORT_PRICE:
      return { ...state, jobList: payload };
    case SORT_DATE:
      return { ...state, jobList: payload };
    case FILTER_CATEGORY:
      return { ...state, jobList: payload };
    case SET_JOBID:
      return { ...state, jobId: payload };
    case CANCEL_JOB:
      return { ...state, cancelJob: payload };
    case GET_PROFILE_JOBS:
      return { ...state, jobsProfile: payload}
    default:
      return state;
  }
}
