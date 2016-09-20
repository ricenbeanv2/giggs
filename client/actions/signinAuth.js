import axios from 'axios';

export function userSignIn(info) {
  console.log('inside actions folder!!!', info)
  const request = axios.post('/auth/signin', info);
  console.log('request inside auth.js', request)
  return {
    type: 'SIGN_IN',
    payload: request
  }
}
