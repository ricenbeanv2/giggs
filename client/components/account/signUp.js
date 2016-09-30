import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Cookies from 'js-cookie';
import { userSignUp, facebookSignUp, getUserInfo } from '../../actions/auth';

import renderField from '../renderField';

let SignUpForm = props => {
  let passCheck = <div />;
  let loading = '';
  const { error, handleSubmit, submitting } = props;
  if (submitting) {
    console.log('loading changed');
    loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
    passCheck = <div />;
  }
  console.log('props.auth:', props.auth);
  if (typeof props.auth.confirm === 'string' && props.auth.confirm.includes('Passwords')) {
    passCheck = <div>{props.auth.confirm}</div>;
  } else {
    passCheck = <div />;
  }
  console.log(props.jobs)
  return (
    <form onSubmit={handleSubmit((data) => {
      return props.userSignUp(data).then(() => {
        console.log('test');
        props.getUserInfo(Cookies.getJSON('user').userid);
      });
    })}>
      <h3>Sign Up</h3>
      <div className="form-group">
        <Field name="username" component={renderField} type="text" className="form-control" placeholder="Username" />
      </div>

      <div className="form-group">
        <Field name="name" component={renderField} type="text" className="form-control" placeholder="Name" />
      </div>

      <div className="form-group">
        <Field name="email" component={renderField} type="text" className="form-control" placeholder="E-mail" />
      </div>

      <div className="form-group">
        <Field name="phone" component={renderField} type="number" className="form-control" placeholder="Phone Number" />
      </div>

      <div className="form-group">
        <Field name="password" component={renderField} type="password" className="form-control" placeholder="Password" />
      </div>

      <div className="form-group">
        <Field name="passconfirm" component={renderField} type="password" className="form-control" placeholder="Confirm Password" />
      </div>
      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">Sign Up</button>
        <button type="button" className="btn btn-primary" onClick={facebookSignUp}>Facebook Sign Up</button>
      </div>
      {error && <strong>{error}</strong>}
      <img src={loading} />
      {/* {passCheck} */}
    </form>
  );
};

function mapStateToProps({ auth, jobs }) {
  return { auth, jobs };
}

SignUpForm = reduxForm({
  form: 'SignUpForm'
})(SignUpForm);

export default connect(mapStateToProps, { userSignUp, getUserInfo })(SignUpForm);
