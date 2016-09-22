import axios from 'axios';

export function createJob(jobDetails) {
  jobDetails.category = jobDetails.category.value;
  const request = axios.post('/db/jobs/create', jobDetails);
  return (dispatch) => {
    return request
      .then((response) => {
        console.log('createJob payload:', response);
        dispatch({ type: 'SIGN_UP', payload: response.data });
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
    type: 'GET_JOBS',
    // payload: request
    payload: 'test'
  };
}
