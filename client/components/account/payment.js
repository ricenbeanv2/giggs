import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import renderField from '../renderField';
import { submitPayment } from '../../actions/payment';


class UserPayment extends Component {

	constructor(props) {
		super(props);

		this.state = {};

	};
	
	render(props) {
		let loading = '';
		const { error, handleSubmit, submitting } = this.props;
		
		if (submitting) {
			loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		}

		return (
			<div>
				<form onSubmit={ handleSubmit(data => {
					return this.props.submitPayment(data)
				}) }>
					<div className="form-group">
						<Field name="paypalEmail" component={renderField} type="text" className="form-control" placeholder="Valid PayPal Email" />
					</div>
					<div className="form-group">
						<Field name="payment" component={renderField} type="number" className="form-control" placeholder="$ Payment" />
					</div>
					<div>
						<button type="submit" disabled={submitting} className="btn btn-primary" >Pay With PayPal</button>
					</div>
					{error && <strong>{error}</strong>}
					<img src={loading} />
				</form>
			</div>
		);
	}
}

UserPayment = reduxForm({ form: 'userPayment' })(UserPayment);

export default UserPayment = connect((state) => ({ initialValues: state.auth.userData }), { submitPayment })(UserPayment);
