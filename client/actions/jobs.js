import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { createJob, notFilled } from './actionTypes';

export function sendJob(jobDetails) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.location_lat = 1.0;
  jobDet.location_lng = 2.0;
  jobDet.user_id = localStorage.getItem('id');
  console.log('cookies user', Cookies.getJSON('token'));
  console.log('jobDetails', jobDet);
  return (dispatch) => {
    return axios.post('/db/jobs/create', jobDet, { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then((response) => {
        console.log('createJob payload:', response);
        browserHistory.push('/joblistings');
        dispatch({ type: createJob, payload: response.data });
      })
      .catch(() => {
        console.log('value:', Object.keys(jobDet).length);
        if (Object.keys(jobDet).length < 9) {
          throw new SubmissionError({ _error: 'Please fill out missing fields.' });
        }
        throw new SubmissionError({ _error: 'Please log in.' });
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
