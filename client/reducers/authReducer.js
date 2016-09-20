export default function (state = [], action) {
  console.log('inside authReducer', action.payload);
  console.log('action type inside authReducer', action.type);
  switch (action.type) {
    case 'SIGN_UP':
      return action.payload;
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
}
