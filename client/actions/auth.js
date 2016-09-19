import axios from 'axios';

export function userSignUp(info) {
  console.log('inside actions folder!!!', info)
  //const request = axios.get('insert backend endpoint here')
  //change payload to be the data received from backend
  return {
    type: 'SIGN_UP',
    payload: 'test'
  }
}
