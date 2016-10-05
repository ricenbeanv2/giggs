import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Cookies from 'js-cookie';
import { userSignIn, getUserInfo } from '../../actions/auth';


import renderField from '../renderField';

class SignIn extends Component {
  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit((data) => {
          return this.props.userSignIn(data)
          .then(() => {
            return this.props.getUserInfo(Cookies.getJSON('user').userid);
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
            <a href="/auth/facebook">
              <button type="button" className="btn btn-primary">Facebook Login</button>
            </a>
          </div>
          {error && <strong>{error}</strong>}
        </form>
      </div>
    );
  }
}
SignIn = reduxForm({
  form: 'SignInForm'
})(SignIn);

export default connect(null, { userSignIn, getUserInfo })(SignIn);
