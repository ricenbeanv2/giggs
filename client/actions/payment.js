import axios from 'axios';
import Cookies from 'js-cookie';
import { SUBMIT_PAYMENT } from './actionTypes';

export function submitPayment(paymentDetails) {

	const payment = paymentDetails.payment;
	const payoutEmail = paymentDetails.paypalEmail;

	return (dispatch) => {
		return axios.get('/db/payments/generateToken', { headers: { 'x-access-token': Cookies.getJSON('token')} })
			.then(function(response) {
				braintree.client.create({
					authorization: response.data
				}, function (error, clientInstance) {
					braintree.paypal.create({ client: clientInstance }, function(error, paypalInstance) {
						paypalInstance.tokenize({
							flow: 'checkout', //required
							amount: payment, //required
							currency: 'USD', //required
						}, function(error, tokenizationPayload) {
							return axios.post('/db/payments/checkout', { params: { tokenizationPayload, payoutEmail, payment } }, { headers: { 'x-access-token': Cookies.getJSON('token')} })
								.then(function(response) {
									dispatch({ type: SUBMIT_PAYMENT, payload: response.data });
							});
						});
					});
				});
	 	})
		.catch(error => console.error(error));
   }
}
