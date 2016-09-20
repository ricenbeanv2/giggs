export default function (state = [], action) {
  console.log('inside authReducer', action.payload);
  switch (action.type) {
  case 'SIGN_UP':
    return action.payload;
  }
  return state;
}
