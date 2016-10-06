import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS, REVIEW_INFO, IS_REVIEWED, GET_EMPLOYEE_REVIEWS, GET_EMPLOYER_REVIEWS, GET_STAR_RATING } from './actionTypes';

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

export function getEmployeeReviews(userID) {
  let request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  let reviewRequest = axios.get('/db/reviews/getAll?type=employee', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  return (dispatch) => {
    return request
    .then((response) => {
      return response.data.filter((eachJob) => {
        if(eachJob.user_id === userID) {
          return eachJob;
        }
      })
    })
    .then((response) => {
      return response.map((eachJob) => {
        return eachJob.id;
      })

    })
    .then((response) => {
      let arrayData = [];
         reviewRequest
        .then((eachReview) => {
          return eachReview.data.forEach((review) => {
            return response.filter((eachJobID) => {
              if(eachJobID === review.job_id) {
                arrayData.push(review);
              }
            })
          })
        })
        .catch((error) => {
          throw error;
        })
        return arrayData;
    })
    .then((response) => {
      let dataArray = []
        response.map((eachReview) => {
        axios.get('/db/users/' + eachReview.review_id, { headers: { 'x-access-token': Cookies.getJSON('token') } })
        .then((userInfo) => {
          eachReview.review_id = userInfo.data.username;
        })
        .catch((error) => {
          throw error;
        })
        dataArray.push(eachReview)
      })
      return dataArray
    })
    .then((response) => {
      let starRating;
        if(response.length === 1) {
          starRating = response[0].numericalEmployeeReview
        } else {
          starRating = response.reduce((currentReview, nextReview)=> {
            return parseInt(currentReview.numericalEmployeeReview) + parseInt(nextReview.numericalEmployeeReview)
          }, 0);
        }
      dispatch({type: GET_STAR_RATING, payload: starRating})
      return response;
    })
    .then((response) => {
      console.log('Line 82:', response);
      dispatch({type: GET_EMPLOYEE_REVIEWS, payload: response})
    })
    .catch(error => {
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
