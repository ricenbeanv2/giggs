import axios from 'axios';

export function createJob(jobDetails) {
  console.log('inside job.js', jobDetails);
  //const request = axios.post('insert endpoint here', jobDetails)
  return {
    type: 'CREATE_JOB',
    payload: 'test'
  };
}
