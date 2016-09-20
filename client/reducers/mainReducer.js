import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import JobReducer from './jobReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  job: JobReducer
});

export default rootReducer;
