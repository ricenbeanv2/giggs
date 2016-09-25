export default function (state = [], { type, payload }) {
  switch (type) {
    case 'CREATE_JOB':
      return payload;
    case 'GET_JOBS':
      return action.payload;
    default:
      return state;
  }
}
