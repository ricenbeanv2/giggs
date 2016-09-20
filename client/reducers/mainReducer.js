import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import AuthReducer from './authReducer';
import JobReducer from './jobReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  job: JobReducer
});

const store = applyMiddleware(ReduxPromise)(createStore)(rootReducer);
export default store;
