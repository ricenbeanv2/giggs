import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS } from './actionTypes';

export function createReview (reviewProp) {
  // using the end point axios.post('/db/reviews/create', reviewProp, { headers: { 'x-access-token': Cookies.getJSON('token') } })

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


export function getReviews () {
  console.log("inside getReviews:");
  return (dispatch) => {
    dispatch({type:GET_REVIEWS, payload: []})
  }
};
