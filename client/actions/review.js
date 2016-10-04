import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS } from './actionTypes';

export function createReview (reviewProp) {
  console.log("inside createReview:", reviewProp);
  return (dispatch) => {
    return axios.post('/db/reviews/create', reviewProp, { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then((response) => {
      dispatch({type: CREATE_REVIEW, payload: response.data})
    })
    .catch((error) => {
      throw error;
    })

  }
};


export function getReviews (userID) {
  let request = axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  let reviewRequest = axios.get('/db/reviews/getAll?type=employer', { headers: { 'x-access-token': Cookies.getJSON('token') } })
  console.log('Line 24 - Inside getReviews actions');
  return (dispatch) => {
  console.log('Line 27 - Inside dispatch');
    return request
    .then((response) => {
      console.log('Inside 30 - response success and returned: ', response.data);
      return response.data.filter((eachJob) => {
        if(eachJob.user_id === userID){
          return eachJob;
        }
      })
    })
    .then((response) => {
      console.log('Line 38 after filtering:', response);
      return response.map((eachJob) => {
        return eachJob.id;
      })
    })
    .then((arrayData) => {
      console.log('Line 44 after mapping the job_id', arrayData);
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
      console.log("Line 55", response);
      dispatch({type: GET_REVIEWS, payload: response});
    })
    .catch((error) => {
      throw error;
    })
  }
};
