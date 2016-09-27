import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Cookies from 'js-cookie';
import { userSignIn, getUserInfo } from '../../actions/auth';

import renderField from '../renderField';

let SignIn = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit((data) => {
      props.userSignIn(data).then(() => {
        props.getUserInfo(Cookies.getJSON('user').userid);
      });
    })}>
      <h3>Log in</h3>
      <div className="form-group">
        <Field name="username" component={renderField} type="text" className="form-control" placeholder="Username" />
      </div>
      <div className="form-group">
        <Field name="password" component={renderField} type="password" className="form-control" placeholder="Password" />
      </div>
      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">Log In</button>
      </div>
    </form>
  );
};

SignIn = reduxForm({
  form: 'SignInForm'
})(SignIn);

export default connect(null, { userSignIn, getUserInfo })(SignIn);
