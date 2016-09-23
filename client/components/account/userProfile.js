import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderField from '../renderField';

let UserProfile = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit(props.userSignUp)}>
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
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default UserProfile = reduxForm({
  form: 'userProfileForm'
})(UserProfile);

// UserProfile = connect(
//   state => ({
//     initialValues: state.auth
//   }),
//   { }
// )
