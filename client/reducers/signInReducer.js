export default function (state = [], action) {
  console.log('inside authReducer', action.payload)
  switch (action.type) {
  case 'SIGN_IN':
    return action.payload.data;
  }
  return state;
}
