import axios from 'axios';

export function userSignUp(info) {
  const request = axios.post('/auth/signup', info);
  return (dispatch) => {
    return request
      .then((response) => {
        dispatch({ type: 'SIGN_UP', payload: response.data });
      });
  };
}

export function userSignIn(info) {
  const request = axios.get('/auth/signin', { params: info });
  return (dispatch) => {
    return request
      .then((response) => {
        dispatch({ type: 'SIGN_IN', payload: response.data });
      });
  };
}
