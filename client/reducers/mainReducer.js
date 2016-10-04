import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import AuthReducer from './authReducer';
import JobReducer from './jobReducer';
import CatReducer from './catReducer';
import ApplyReducer from './applyReducer';
import MapReducer from './mapReducer';
import ChatReducer from './chatReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: AuthReducer,
  jobs: JobReducer,
  form: formReducer,
  cats: CatReducer,
  apply: ApplyReducer,
  map: MapReducer,
  chat: ChatReducer
});

export default rootReducer;
