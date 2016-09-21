export default function (state = [], action) {
  switch (action.type) {
  case 'CREATE_JOB':
    return action
  case 'GET_JOBS':
    return action
  }
  return state;
}
