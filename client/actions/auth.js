import axios from 'axios';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';
import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER, LOGGED_OUT } from './actionTypes';

export function userSignUp(info) {
  return (dispatch) => {
    if (info.password !== info.passconfirm) {
      dispatch({ type: PW_NOT_SAME, payload: 'Passwords not same' });
    } else {
      return axios.post('/auth/signup', info)
        .then((response) => {
          console.log('response.data', response.data);
          dispatch({ type: SIGN_UP, payload: response.data });
          if (typeof response.data !== 'string') {
            Cookies.set('user', response.data.user);
            Cookies.set('token', response.data.token);
          } else {
            console.log('inside else statement', response.data);
            if (response.data.includes('username')) {
              console.log('inside here');
              throw new SubmissionError({ username: 'username already exists', _error: 'Please try again' });
            }
            if (response.data.includes('email')) {
              throw new SubmissionError({ email: 'E-mail already exists', _error: 'Please try again' });
            }
          }
        });
      }
  };
}

export function userLogOut() {
  return (dispatch) => {
    dispatch({ type: LOGGED_OUT });
    Cookies.remove('user');
    Cookies.remove('token');
  };
}

export function userSignIn(info) {
  const request = axios.get('/auth/signin', { params: info });
  return (dispatch) => {
    console.log('dispatch inside auth.js', dispatch);
    return request
      .then((response) => {
        dispatch({ type: SIGN_IN, payload: response.data });
        Cookies.set('user', response.data.user);
        Cookies.set('token', response.data.token);
      })
      .catch(() => {
        console.log('username or pw invalid');
        dispatch({ type: PW_NOT_SAME, paylod: 'Passwords not same' });
      });
  };
}

export function facebookSignUp() {
  axios.get('/auth/facebook')
    .then((response) => {
      console.log('response', response);
    });
}

export function getUserInfo(id) {
  console.log('id inside getuserinfo', id);
  return (dispatch) => {
  return axios.get('/db/users/' + id, { headers: { 'x-access-token': Cookies.getJSON('token') } })
    .then((response) => {
      dispatch({ type: GET_USER, payload: response.data });
      console.log('response.data inside getuserinfo', response.data);
      browserHistory.push('/userprofile');
    });
  }
}

export function updateUserInfo(info) {
  return (dispatch) => {
    return axios.post('/db/users/update', { id: localStorage.getItem('id'), fields: info })
      .then((response) => {
        console.log('response inside updateUserInfo', response);
        dispatch({ type: UPDATE_USER, payload: response.data });
        throw new SubmissionError({ _error: 'User Profile Updated!' });
      });
  };
}
