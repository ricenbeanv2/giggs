import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS, GET_CATEGORY, SORT_PRICE, SORT_CATEGORIES, SORT_DATE, FILTER_CATEGORY, GET_LAT_LONG } from '../actions/actionTypes';

const INITIAL_STATE = { job: [], joblist: [], created: [], category: [], latLong: {} };

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
    case GET_CATEGORY:
      return { ...state, category: payload };
    case SORT_CATEGORIES:
      return { ...state, jobList: payload };
    case SORT_PRICE:
      return { ...state, jobList: payload };
    case SORT_DATE:
      return { ...state, jobList: payload };
    case FILTER_CATEGORY:
      return { ...state, jobList: payload };
    default:
      return state;
  }
}
