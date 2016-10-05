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
					<h3>information</h3>
					<div className="form-group">
						<label>Name</label>
						<Field name="name" component={renderField} type="text" className="form-control" />
					</div>

					<div className="form-group">
						<label>Credit Card Number</label>
						<Field name="creditCardNumber" component={renderField} type="number" className="form-control" />
					</div>

					<div className="form-group">
						<label>Expiration Date</label>
						<Field name="expirationDate" component={renderField} type="date" className="form-control" />
					</div>

					<div className="form-group">
						<label>Security Code</label>
						<Field name="securityCode" component={renderField} type="number" className="form-control" />
					</div>

					<div>
						<button type="submit" disabled={submitting} className="btn btn-primary" >Submit Payment</button>
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
