import axios from 'axios';
import { createJob } from './actionTypes';

export function sendJob(jobDetails) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.location_lat = 1.0;
  jobDet.location_lng = 2.0;
  jobDet.user_id = localStorage.getItem('id');
  console.log('jobDetails', jobDet);
  const request = axios.post('/db/jobs/create', jobDetails);
  return (dispatch) => {
    return request
      .then((response) => {
        console.log('createJob payload:', response);
        dispatch({ type: 'CREATE_JOB', payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getJobList() {
  console.log('inside job.js');
  // const request = axios.get('/db/jobs/getAll');
  return {
    type: createJob,
    payload: 'test'
  };
}
