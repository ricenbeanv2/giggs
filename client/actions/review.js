import axios from 'axios';
import Cookies from 'js-cookie';

import { CREATE_REVIEW, GET_REVIEWS, REVIEW_INFO, IS_REVIEWED, GET_EMPLOYEE_REVIEWS, GET_EMPLOYER_REVIEWS, GET_STAR_RATING } from './actionTypes';

export function createReview(reviewProp) {
  return (dispatch) => {
    return axios.post('/db/reviews/create', reviewProp, {
      headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then((response) => {
      if (typeof response.data !== 'string') {
        dispatch({ type: CREATE_REVIEW, payload: response.data });
      }
    })
    .catch(error => {
      throw error;
    });
  };
}

export function getEmployeeReviews(userID) {
  return dispatch => {
    return axios.get('/db/reviews/getAll', {
       params: {
         type: 'employee',
         rated_user: userID
       },
       headers: { 'x-access-token': Cookies.getJSON('token') }
     })
    .then(response => {
      dispatch({ type: GET_EMPLOYEE_REVIEWS, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function getEmployerReviews(userID) {
  return dispatch => {
    return axios.get('/db/reviews/getAll', {
       params: {
         type: 'employer',
         rated_user: userID
       },
       headers: { 'x-access-token': Cookies.getJSON('token') }
     })
    .then(response => {
      dispatch({ type: GET_EMPLOYER_REVIEWS, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}

export function setReviewInfo(info) {
  if (!info.rated_user) {
    return dispatch => {
      return axios.get('/db/jobs/query', {
        params: { field: 'id', key: info.job_id },
      })
      .then(response => {
        info.rated_user = response.data[0].user_id;
        dispatch({ type: REVIEW_INFO, payload: info });
      })
      .catch(error => {
        throw error;
      });
    };
  }
  return dispatch => {
    dispatch({ type: REVIEW_INFO, payload: info });
  };
}

export function isReviewed(params) {
  return dispatch => {
    return axios.get('/db/reviews/singleReview', {
       params: {
         type: params.type,
         user_id: params.user_id,
         job_id: params.job_id,
         rated_user: params.rated_user
       },
       headers: { 'x-access-token': Cookies.getJSON('token') }
     })
    .then(response => {
      dispatch({ type: IS_REVIEWED, payload: response.data });
    })
    .catch(error => {
      throw error;
    });
  };
}
