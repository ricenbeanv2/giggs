import axios from 'axios';
import Cookies from 'js-cookie';
import { SUBMIT_PAYMENT } from './actionTypes';

export function submitPayment(jobDetails) {

	let payment = jobDetails.max_price;

	return (dispatch) => {
		return axios.get('/db/payments/generateToken', { headers: { 'x-access-token': Cookies.getJSON('token')} })
			.then(function(response) {
				//console.log(response.data)
				braintree.client.create({
					authorization: response.data
				}, function (error, clientInstance) {
					//console.log(clientInstance)
					braintree.paypal.create({ client: clientInstance }, function(error, paypalInstance) {
						paypalInstance.tokenize({
							flow: 'checkout', //required
							amount: 99.00, //required
							currency: 'USD', //required
							locale: 'en_US',
						}, function(error, tokenizationPayload) {
							console.log(tokenizationPayload)
							return axios.post('/db/payments/checkout', { params: tokenizationPayload }, { headers: { 'x-access-token': Cookies.getJSON('token')} })
								.then(function(response) {
									console.log("final response ", response);
									dispatch({ type: SUBMIT_PAYMENT, payload: response.data });
							});
						});
					});
				});
	 	}).catch(error => console.error(error));
   }
}

/*When testing in the sandbox, be sure to use our test card numbers (e.g. 4111111111111111) 
and nonces (e.g. fake-valid-nonce)*/