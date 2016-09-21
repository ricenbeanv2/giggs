import axios from 'axios';

export function userSignUp(info) {
  console.log('info inside auth.js', info);
  const request = axios.post('/auth/signup', info);
  return (dispatch) => {
    return request
      .then((response) => {
        console.log('signup payload:', response.data)
        dispatch({ type: 'SIGN_UP', payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function userSignIn(info) {
  const request = axios.get('/auth/signin', { params: info });
  return (dispatch) => {
    return request
      .then((response) => {
        dispatch({ type: 'SIGN_IN', payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
