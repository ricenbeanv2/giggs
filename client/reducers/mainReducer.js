import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import JobReducer from './jobReducer';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: AuthReducer,
  job: JobReducer,
  form: formReducer
});

export default rootReducer;
