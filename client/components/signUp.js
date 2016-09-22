import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions/auth';
import renderField from './renderField';

class SignUpForm extends Component {
  render() {
    let passCheck = <div />;
    let loading = '';
    const { error, handleSubmit, submitting } = this.props;
    if (submitting) {
      loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
      passCheck = <div />;
    }
    if (typeof this.props.auth === 'string' && this.props.auth.includes('Passwords')) {
      passCheck = <div>{this.props.auth}</div>;
    } else {
      console.log('inside else in signupform');
      passCheck = <div />;
    }
    return (
        <form onSubmit={handleSubmit(this.props.userSignUp)}>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>Username</label>
            <Field name="username" component={renderField} type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Name</label>
            <Field name="name" component={renderField} type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <Field name="email" component={renderField} type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <Field name="password" component={renderField} type="password" className="form-control" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <Field name="passconfirm" component={renderField} type="password" className="form-control" />
          </div>
          {error && <strong>{error}</strong>}
          <div>
            <button type="submit" disabled={submitting}>Sign Up</button>
          </div>
          <img src={loading} />
          {passCheck}
        </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

SignUpForm = reduxForm({
  form: 'SignUpForm'
})(SignUpForm);

export default connect(mapStateToProps, { userSignUp })(SignUpForm);
