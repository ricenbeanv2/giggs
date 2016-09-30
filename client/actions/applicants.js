import axios from 'axios';
import Cookies from 'js-cookie';
import { APPLY_JOB, CANCEL_APP, UPDATE_BID, GET_APPLICANTS, UPDATE_STATUS } from './actionTypes';

export function getApplicants(jobID) {
  return (dispatch) => {
    return axios.get('/db/applicant/', { params: { job_id: jobID } }, {
      headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      return Promise.all(
        response.data.map(applicant => {
          return axios.get(`/db/users/${applicant.user_id}`,
            { headers: { 'x-access-token': Cookies.getJSON('token') } })
            .then(res => {
              applicant.username = res.data.username;
              return applicant;
            })
          })
      )
      .then((result) => {
        console.log('application action: ', result)
        dispatch({ type: GET_APPLICANTS, payload: result });
      })
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
  console.log('info: ', info);
  return (dispatch) => {
    return axios.post('/db/applicant/apply', info, {
      headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      console.log('response: ', response.data);
      dispatch({ type: APPLY_JOB, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function cancelApp(info) {
  return (dispatch) => {
    return axios.post('/db/applicant/cancel', info,
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      dispatch({ type: CANCEL_APP, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function changeStatus(params) {
  return (dispatch) => {
    return axios.get('/db/applicants/changeStatus', { params },
    { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
      dispatch({ type: UPDATE_STATUS, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}
