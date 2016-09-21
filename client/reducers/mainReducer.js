import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import JobReducer from './jobReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  job: JobReducer,
  form: formReducer
});

export default rootReducer;
