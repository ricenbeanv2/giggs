import axios from 'axios';

import { GET_PARENT_CATS } from './actionTypes';

export function getParents() {
  return (dispatch) => {
    return axios.get('/db/category/getParents')
      .then((response) => {
        dispatch({ type: GET_PARENT_CATS, payload: response.data });
      });
  };
}
