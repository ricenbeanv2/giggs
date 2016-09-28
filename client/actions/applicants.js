import axios from 'axios';
import Cookies from 'js-cookie';
import { APPLY_JOB, CANCEL_JOB, UPDATE_BID, GET_APPLICANTS } from './actionTypes';

export function getApplicants(job_id) {
  return (dispatch) => {
    return axios.get('/db/applicant/', { params: { job_id } })
    .then(response => {
      dispatch({ type: GET_APPLICANTS, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function updateBid(info) {
  return (dispatch) => {
    return axios.post('/db/applicant/updateBid', info,
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then(response => {
        dispatch({ type: UPDATE_BID, payload: response.data });
      })
      .catch(error => {
        throw error;
      });
  };
}

export function applyJob(info) {
  return (dispatch) => {
    return axios.post('/db/applicant/apply', info,
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      dispatch({ type: APPLY_JOB, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function cancelJob(info) {
  return (dispatch) => {
    return axios.post('/db/applicant/cancel', info,
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      dispatch({ type: CANCEL_JOB, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}
