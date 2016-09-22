export default function (state = '', action) {
  switch (action.type) {
    case 'PW_NOT_SAME':
      return action.payload;
    case 'SIGN_UP':
      return action.payload;
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
}
