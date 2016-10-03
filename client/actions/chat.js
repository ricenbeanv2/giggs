import axios from 'axios';
import Cookies from 'js-cookie';

import { GET_CHAT_HISTORY, POST_MESSAGE } from './actionTypes';

export const getHistory = roomName => {
  return dispatch => {
    return axios.get(`/db/messages/history?roomName=${roomName}`)
      .then(response => {
        const messages = response.data.map(msg => {
          return msg.message;
        });
        console.log('messages array: ', messages);
        dispatch({ type: GET_CHAT_HISTORY, payload: messages });
      });
  };
};

export const sendMessage = (roomName, message) => {
  return dispatch => {
    return axios.post('/db/messages/create', {
      roomName,
      user_id: Cookies.getJSON('user').userid,
      message
    })
    .then(response => {
      console.log('response.data: ', response.data);
    });
  };
};
