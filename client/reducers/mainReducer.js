import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
  auth: AuthReducer
});

const store = applyMiddleware(ReduxPromise)(createStore)(rootReducer);
export default store;
