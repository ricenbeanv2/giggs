import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS, REVIEW_INFO, IS_REVIEWED, GET_EMPLOYEE_REVIEWS, GET_EMPLOYER_REVIEWS } from './actionTypes';

export function createReview(reviewProp) {
  console.log("in axios create review", reviewProp);
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

export function getEmployeeReviews(type,userID) {
  let typeTable = type;
  let request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  let reviewRequest = axios.get('/db/reviews/getAll?type=employee', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      return response.data.filter((eachJob) => {
        if(eachJob.user_id === userID){
          return eachJob;
        }
      })
    })
    .then((response) => {
      return response.map((eachJob) => {
        return eachJob.id;
      })
    })
    .then((arrayData) => {
      return reviewRequest
      .then((response) => {
        return arrayData.map((eachReviewID) => {
          return response.data.filter((eachReview) => {
            if(eachReviewID === eachReview.review_id){
              return eachReview;
            }
          })
        })
      })
      .catch((error) => {
        throw error;
      })
    })
    .then((response) => {
      return response.map((eachReview) => {
        return eachReview[0]
      })
    })
    .then((response) => {
      dispatch({type: GET_EMPLOYEE_REVIEWS, payload: response});
    })
    .catch((error) => {
      throw error;
    })
  }
};

export function getEmployerReviews(userID) {
  let request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  let reviewRequest = axios.get('/db/reviews/getAll?type=employer' , { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      return response.data.filter((eachJob) => {
        if(eachJob.user_id === userID){
          return eachJob;
        }
      })
    })
    .then((response) => {
      return response.map((eachJob) => {
        return eachJob.id;
      })
    })
    .then((arrayData) => {
      return reviewRequest
      .then((response) => {
        return arrayData.map((eachReviewID) => {
          return response.data.filter((eachReview) => {
            if(eachReviewID === eachReview.review_id){
              return eachReview;
            }
          })
        })
      })
      .catch((error) => {
        throw error;
      })
    })
    .then((response) => {
      return response.map((eachReview) => {
        return eachReview[0]
      })
    })
    .then((response) => {
      dispatch({type: GET_EMPLOYER_REVIEWS, payload: response});
    })
    .catch((error) => {
      throw error;
    })
  }
};


export function setReviewInfo(info) {
  return dispatch => {
    dispatch({ type: REVIEW_INFO, payload: info });
  };
}

export function isReviewed(params) {
  return dispatch => {
    return axios.get('/db/reviews/singleReview', {
       params: {
         type: params.type,
         review_id: params.review_id,
         job_id: params.job_id
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
