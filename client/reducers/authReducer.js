export default function (state = '', action) {
  switch (action.type) {
    case 'SIGN_UP':
      console.log('acttion.payload', action.payload);
      return action.payload;
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
}
