import axios from 'axios';

export function userSignUp(info) {
  console.log('inside actions folder!!!', info);
  const request = axios.post('/auth/signup', info);
  return (dispatch) => {
    console.log('dispatch inside auth.js', dispatch);
    return request
      .then((response) => {
        console.log('inside dispatch', response.data);
        dispatch({ type: 'SIGN_UP', payload: response.data });
      });
  };
}
