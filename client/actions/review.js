import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS } from './actionTypes';

export function createReview (reviewProp) {
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
      console.log('Inside line 39 actions file:', arrayData)
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
      dispatch({type: GET_REVIEWS, payload: response});
    })
    .catch((error) => {
      throw error;
    })
  }
};
