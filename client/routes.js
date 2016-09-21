import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import SignIn from './components/signIn.js';
import rootReducer from './reducers/mainReducer';
import App from './app.js';
import CreateJob from './components/createJob';
import UserProfile from './components/userProfile';
import SignUpForm from './components/signUpForm';
import JobListings from './components/jobListings';

//Basic routing, to add another route just do:
//<Route path='/insertUrl' component={insertComponentName} />
const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleWare(rootReducer, window.devToolsExtension ? window.devToolsExtension() : f => f);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='signup' component={SignUpForm} />
        <Route path='signin' components={SignIn} />
        <Route path='createjob' component={CreateJob} />
        <Route path='userprofile' component={UserProfile} />
        <Route path='joblistings' component={JobListings} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
