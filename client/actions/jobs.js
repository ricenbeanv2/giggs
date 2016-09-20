import axios from 'axios';

export function createJob(jobDetails) {
  return {
    type: 'CREATE_JOB',
    payload: jobDetails
  }
}
