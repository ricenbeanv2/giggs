import axios from 'axios';
import Cookies from 'js-cookie';
import { APPLY_JOB, CANCEL_APP, UPDATE_BID, GET_APPLICANTS, UPDATE_STATUS, GET_EMPLOYERS, GET_EMPLOYEES, QUERY_APP, REJECT_ALL } from './actionTypes';

export function getApplicants(jobID) {
  return dispatch => {
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
      .then(result => {
        dispatch({ type: GET_APPLICANTS, payload: result });
      })
    })
    .catch(error => {
      throw error;
    });
  };
}

export function getEmployees(userId) {
  const config = { params: { field: 'user_id', key: userId } };
  return dispatch => {
    return axios.get('/db/jobs/query', config)
      .then(response => {
        const jobIds = response.data.map(job => {
          return job.id;
        });
        const configs = { params: { field: 'job_id', key: `[${jobIds.toString()}]` } };
        return axios.get('/db/applicant/getAll', configs)
          .then(res => {
            const employees = res.data.map(applicant => {
              return applicant.user_id;
            });
            const filterEmployees = employees.filter((id, idx) => {
              return employees.indexOf(id) === idx;
            });
            dispatch({ type: GET_EMPLOYEES, payload: filterEmployees });
          });
      });
  };
}

export function getEmployers(userId) {
  const config = { params: { user_id: userId } };
  return dispatch => {
    return axios.get('/db/applicant/getJobs', config)
      .then(response => {
        const appliedJobs = response.data.map(applicant => {
          return applicant.job_id;
        });
        const configs = { params: { field: 'id', key: `[${appliedJobs.toString()}]` }, headers: { 'x-access-token': Cookies.getJSON('token') } };
        return axios.get(`/db/jobs/query`, configs)
          .then(res => {
            const employers = res.data.map(jobs => {
              return jobs.user_id;
            });
            dispatch({ type: GET_EMPLOYERS, payload: employers });
          });
      });
  };
}

export function updateBid(info) {
  return dispatch => {
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
  return dispatch => {
    return axios.post('/db/applicant/apply', info, {
      headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then(response => {
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

export function changeStatus(info) {
  return dispatch => {
    return axios.get('/db/applicant/changeStatus', {
      params: {
        id: info.id,
        job_status: info.job_status
      },
      headers: { 'x-access-token': Cookies.getJSON('token') }
    })
      .then(response => {
        dispatch({ type: UPDATE_STATUS, payload: response.data });
      })
      .catch(error => {
        throw error;
      });
    };
}

export function queryApp(info) {
  return dispatch => {
    return axios.get('/db/applicant/queryEntry', {
      params: {
        user_id: info.user_id,
        job_id: info.job_id
      },
      headers: { 'x-access-token': Cookies.getJSON('token') }
    })
    .then(response => {
      dispatch({ type: QUERY_APP, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function rejectAll(jobID) {
  return dispatch => {
    return axios.get('/db/applicant/changeAllStatus', {
      params: {
        job_id: jobID,
        job_status: 'rejected'
      },
      headers: { 'x-access-token': Cookies.getJSON('token') }
    })
    .then(response => {
      dispatch({ type: REJECT_ALL, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}
