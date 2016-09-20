import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

import App from './app.js'
import SignUp from './components/signUp'
import SignIn from './components/signIn.js'
import CreateJob from './components/createJob'
import store from './reducers/mainReducer'

//Basic routing, to add another route just do:
//<Route path='/insertUrl' component={insertComponentName} />

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='signup' component={SignUp} />
      <Route path='signin' components={SignIn} />
      <Route path='createjob' component={CreateJob} />
    </Router>
  </Provider>
), document.getElementById('app'));
