import axios from 'axios';

export function userSignUp(info) {
  console.log('inside actions folder!!!', info)
  const request = axios.post('/auth/signup', info);
  console.log('request inside auth.js', request)
  return {
    type: 'SIGN_UP',
    payload: request
  }
}
