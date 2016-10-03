import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { GET_REVIEWS, CREATE_REVIEW } from './actionTypes';

export function createReview (reviewProp) {
  console.log("inside createReview:", reviewProp);
  return (dispatch) => {
    dispatch({type:CREATE_REVIEW, payload: []})
  }
}


export function getReviews () {
  console.log("inside getReviews:");
  return (dispatch) => {
    dispatch({type:GET_REVIEW, payload: []})
  }
}
