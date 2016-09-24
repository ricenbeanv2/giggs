import axios from 'axios';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';
import { SIGN_UP, SIGN_IN, PW_NOT_SAME, UPDATE_USER, GET_USER } from './actionTypes';

export function userSignUp(info) {
  return (dispatch) => {
    if (info.password !== info.passconfirm) {
      dispatch({ type: PW_NOT_SAME, payload: 'Passwords not same' });
    } else {
      axios.post('/auth/signup', info)
        .then((response) => {
          dispatch({ type: SIGN_UP, payload: response.data });
          if (typeof response.data !== 'string') {
            localStorage.setItem('id', response.data.user.userid);
            localStorage.setItem('token', response.data.token);
            getUserInfo(response.data.user.userid);
          } else {
            if (response.data.includes('username')) {
              throw new SubmissionError({ username: 'username already exists', _error: 'Please try again' });
            }
            if (response.data.includes('email')) {
              throw new SubmissionError({ email: 'E-mail already exists', _error: 'Please try again' });
            }
          }
        })
        .catch((error) => {
          console.log('inside catch', error);
          throw new SubmissionError({ _error: error });
        });
      }
  };
}

export function userSignIn(info) {
  console.log('inside actions folder!!!', info);
  const request = axios.get('/auth/signin', { params: info });
  return (dispatch) => {
    console.log('dispatch inside auth.js', dispatch);
    return request
      .then((response) => {
        console.log('inside dispatch', response);
        dispatch({ type: SIGN_IN, payload: response.data });
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
  axios.get('/db/users/' + id)
    .then((response) => {
      setLocal(response.data);
      browserHistory.push('/userprofile');
    });

}
export function updateUserInfo(info) {
  return (dispatch) => {
    return axios.post('/db/users/update', { id: localStorage.getItem('id'), fields: info })
      .then((response) => {
        console.log('response inside updateUserInfo', response);
        dispatch({ type: UPDATE_USER, payload: response.data });
        setLocal(response.data);
        throw new SubmissionError({ _error: 'User Profile Updated!' });
      });
  }
}

function setLocal(info) {
  localStorage.setItem('email', info.email);
  localStorage.setItem('name', info.name);
  localStorage.setItem('phone', info.phone);
  localStorage.setItem('username', info.username);
}
