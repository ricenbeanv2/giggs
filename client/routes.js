import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './app.js'

//Basic routing, to add another route just do:
//<Route path='/insertUrl' component={insertComponentName} />

render((
  <Router history={browserHistory}>
    <Route path='/' component={App} />
  </Router>
), document.getElementById('app'));
