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
      <div className="login">
        <form className="contact" onSubmit={handleSubmit((data) => {
          return this.props.userSignIn(data)
          .then(() => {
            return this.props.getUserInfo(Cookies.getJSON('user').userid);
          });
        })}>
          <h3>Log in</h3>
          <Field name="username" component={renderField} type="text" className="contact__field" placeholder="Username" />
          <Field name="password" component={renderField} type="password" className="contact__field" placeholder="Password" />
          <div>
            <button type="submit" disabled={submitting} className="btn btn-primary">Log In</button>
            <a className="btn btn--decorated btn--facebook" href="/auth/facebook">
              <i className="fa fa-facebook"></i>Facebook Login
            </a>
          </div>
          {error && <strong>{error}</strong>}
        </form>
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
    );
  }
}
SignIn = reduxForm({
  form: 'SignInForm'
})(SignIn);

export default connect(null, { userSignIn, getUserInfo })(SignIn);
