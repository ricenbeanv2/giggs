import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Cookies from 'js-cookie';

import renderField from '../renderField';
import { updateUserInfo, getUserInfo } from '../../actions/auth';

class UserProfile extends Component {
  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.updateUserInfo)}>
        <h3>User Profile</h3>
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
          <label>Phone Number</label>
          <Field name="phone" component={renderField} type="number" className="form-control" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <Field name="password" component={renderField} type="password" className="form-control" />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <Field name="passconfirm" component={renderField} type="password" className="form-control" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>Update Profile</button>
        </div>
        {error && <strong>{error}</strong>}
        {/* <img src={loading} /> */}
        {/* {passCheck} */}
      </form>
    );
  }
}

UserProfile = reduxForm({
  form: 'userProfileForm'
})(UserProfile);

export default UserProfile = connect((state) => ({
    initialValues: state.auth.userData
  }), { updateUserInfo, getUserInfo })(UserProfile);
