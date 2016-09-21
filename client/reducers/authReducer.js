export default function (state = [], action) {
  console.log('inside authReducer', action);
  switch (action.type) {
    case 'SIGN_UP':
      return action.payload;
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
}
