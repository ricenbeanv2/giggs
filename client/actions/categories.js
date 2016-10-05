import axios from 'axios';

import { GET_PARENT_CATS, GET_CHILDREN_CATS } from './actionTypes';

export function getParents() {
  return dispatch => {
    return axios.get('/db/category/getParents')
      .then(response => {
        dispatch({ type: GET_PARENT_CATS, payload: response.data });
      });
  };
}

export function getChildren() {
    return dispatch => {
      return axios.get('/db/category/getAll')
        .then(response => {
          const childCats = response.data.filter(category => {
            return category.parent_id !== null;
          });
          dispatch({ type: GET_CHILDREN_CATS, payload: childCats });
        });
    };
}
