import axios from 'axios';
import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';

export function userSignUp(info) {
  return (dispatch) => {
    if (info.password !== info.passconfirm) {
      dispatch({ type: 'PW_NOT_SAME', payload: 'Passwords not same' });
    } else {
      axios.post('/auth/signup', info)
        .then((response) => {
          dispatch({ type: 'SIGN_UP', payload: response.data });
          if (typeof response.data !== 'string') {
            localStorage.setItem('id', response.data.user.userid);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/userprofile');
          } else {
            if (response.data.includes('username')) {
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
