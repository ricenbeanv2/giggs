import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS } from '../actions/actionTypes';

export default function (state = [], { type, payload }) {
  switch (type) {
    case CREATE_JOB:
      return payload;
    case GET_JOBS:
      return payload;
    case GET_ALL_JOBS:
      return payload;
    default:
      return state;
  }
}
