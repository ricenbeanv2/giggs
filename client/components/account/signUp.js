import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Cookies from 'js-cookie';
import { userSignUp, getUserInfo } from '../../actions/auth';
import Phone from '../phone';

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
  if (typeof props.auth.confirm === 'string' && props.auth.confirm.includes('Passwords')) {
    passCheck = <div>{props.auth.confirm}</div>;
  } else {
    passCheck = <div />;
  }

  return (
    <form className="contact" onSubmit={handleSubmit((data) => {
      return props.userSignUp(data).then(() => {
        props.getUserInfo(Cookies.getJSON('user').userid);
      });
    })}>
      <h3>Sign Up</h3>
      <Field name="username" component={renderField} type="text" className="contact__field" placeholder="Username" />

      <Field name="name" component={renderField} type="text" className="contact__field" placeholder="Name" />

      <Field name="email" component={renderField} type="text" className="contact__field" placeholder="E-mail" /> <br />

      <Field name="phone" component={Phone} className="contact__field" placeholder="Phone Number" />

      <Field name="password" component={renderField} type="password" className="contact__field" placeholder="Password" />

      <Field name="passconfirm" component={renderField} type="password" className="contact__field" placeholder="Confirm Password" />
      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">Sign Up</button>
        <a className="btn btn--decorated btn--facebook" href="/auth/facebook">
          <i className="fa fa-facebook"></i>Facebook Sign Up
        </a>

      </div>
      {error && <strong>{error}</strong>}
      <img src={loading} />
      {passCheck}
    </form>
  );
};

const mapStateToProps = ({ auth, jobs }) => {
  return { auth, jobs };
};

SignUpForm = reduxForm({
  form: 'SignUpForm'
})(SignUpForm);

export default connect(mapStateToProps, { userSignUp, getUserInfo })(SignUpForm);
