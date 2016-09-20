import axios from 'axios';

export function userSignUp(info) {
  console.log('inside actions folder!!!', info);
  const request = axios.post('/auth/signup', info);
<<<<<<< 75bd2a63791f156f4002f7274a458daa7038ccca
  console.log('request inside auth.js', request);
  return {
    type: 'SIGN_UP',
    payload: request
=======
  return (dispatch) => {
    console.log('dispatch inside auth.js', dispatch);
    return request
      .then((response) => {
        console.log('inside dispatch', response.data);
        dispatch({ type: 'SIGN_UP', payload: response.data });
      });
>>>>>>> [feature] Switched from redux promise to thunk
  };
}
