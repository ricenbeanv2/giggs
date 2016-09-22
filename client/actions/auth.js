import axios from 'axios';
import { browserHistory } from 'react-router';
import {render} from 'react-dom';
import { SubmissionError } from 'redux-form';

export function userSignUp(info) {
  console.log('info inside auth.js', info);
  const request = axios.post('/auth/signup', info);
  return (dispatch) => {
    return request
      .then((response) => {
        dispatch({ type: 'SIGN_UP', payload: response.data });
        console.log('signup payload:', response.data);
        if(typeof response.data !== 'string') {
          localStorage.setItem('id', response.data.user.userid);
          localStorage.setItem('username', response.data.user.username);
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/userprofile');
        } else {
          console.log('piece of shit');
          throw new SubmissionError({ username: 'User already exists', _error: 'Login failed!' })
        }
      });
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
        dispatch({ type: 'SIGN_IN', payload: response.data });
      });
  };
}
