import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import renderField from '../renderField';
import { submitPayment } from '../../actions/payment';


class UserPayment extends Component {
	
	render() {

		const { error, handleSubmit, submitting } = this.props;

		return (
			<div>
				<form onSubmit={ handleSubmit(data => {
					return this.props.submitPayment(data)
				}) }>
					<div>
						<button type="submit" disabled={submitting} className="btn btn-primary" >Pay With PayPal</button>
					</div>
					{error && <strong>{error}</strong>}
				</form>
			</div>
		);
	}
}

UserPayment = reduxForm({
  form: 'userPayment'
})(UserPayment);

export default UserPayment = connect((state) => ({
    initialValues: state.auth.userData
  }), { submitPayment })(UserPayment);
