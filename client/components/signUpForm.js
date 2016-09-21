import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions/auth';

class SignUpForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(userSignUp)}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Username</label>
          <Field name="username" component="input" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Name</label>
          <Field name="name" component="input" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <Field name="email" component="input" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <Field name="passconfirm" component="input" type="password" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary"> Submit </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'MakeSignUpForm'
})(SignUpForm);
