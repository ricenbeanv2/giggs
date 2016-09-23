import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderField from '../renderField';

import { updateUserInfo, getUserInfo } from '../../actions/auth';

class UserProfile extends Component {
  componentWillMount() {
    this.props.getUserInfo(localStorage.getItem('id'));
  }

  render() {
    console.log('auth', this.props.auth);
    console.log('username', this.props.auth.username);
    const { error, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.updateUserInfo)}>
        <h3>User Profile</h3>
        <div className="form-group">
          <label>Username</label>
          <Field name="username" component={renderField} type="text" value={this.props.auth.username || ''} className="form-control" />
        </div>

        <div className="form-group">
          <label>Name</label>
          <Field name="name" component={renderField} type="text" className="form-control" value={this.props.auth.name} />
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
        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>Sign Up</button>
        </div>
        {/* <img src={loading} /> */}
        {/* {passCheck} */}
      </form>
    );
  }
}

UserProfile = reduxForm({
  form: 'userProfileForm'
})(UserProfile);

export default UserProfile = connect(state => ({
    initialValues: state.auth || {}// pull initial values from account reducer
  }), { updateUserInfo, getUserInfo })(UserProfile);
