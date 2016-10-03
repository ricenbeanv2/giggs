import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { CREATE_REVIEW, GET_REVIEWS } from './actionTypes';

export function createReview (reviewProp) {
  console.log("inside createReview:", reviewProp);
  return (dispatch) => {
    dispatch({type: CREATE_REVIEW, payload: []})
  }
};


export function getReviews () {
  console.log("inside getReviews:");
  return (dispatch) => {
    dispatch({type:GET_REVIEWS, payload: []})
  }
};
