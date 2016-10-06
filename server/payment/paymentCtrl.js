const braintree = require("braintree");
const request = require('request');

//Sandbox_REST_PayPal_giggs_client_id
//Sandbox_REST_PayPal_giggs_secret

//needs proper payment amounts and client recepient
function payout(recipient, payment, res) {
	console.log("INSIDE PAYOUT");
	const tokenReqOptions = {
		form: {
			grant_type: 'client_credentials',
		},
		auth: {
			user: process.env.Sandbox_REST_PayPal_giggs_client_id,
			pass: process.env.Sandbox_REST_PayPal_giggs_secret,
		},
	};

	request.post('https://api.sandbox.paypal.com/v1/oauth2/token', tokenReqOptions, (error, response, body) => {
		console.log("INSIDE FIRST REQUEST");
		if (error) {
			res.end(error);
			return;
		}

		let tokenPayload = JSON.parse(body);

		const payoutOptions = {
			headers: {
				authorization: 'Bearer '+ tokenPayload.access_token,
			},
			json: { 
				sender_batch_header: { 
					email_subject: 'Payout Sent',
				},
				items: [{ 
					recipient_type: 'EMAIL',
					amount: {
						value: payment,
						currency: 'USD'
					}, //add the correct amount
					receiver: recipient,
					note: 'Payment for work',
					sender_item_id: 'A123' 
				}],
			},
		};
		request.post('https://api.sandbox.paypal.com/v1/payments/payouts?sync_mode=true', payoutOptions, (error, response, body) => {
			console.log("INSIDE SECOND REQUEST");
			if (error) {
				console.log(error);
				res.send(error);
			}
			console.log(body);
			res.send(body);
		});
	});
}

const gateway = braintree.connect({
	accessToken: process.env.SandBox_Access_Token,
});

module.exports = {

	generateToken: (req, res) => {
		gateway.clientToken.generate({}, (error, response) => {
			if (error) {
				res.end(error);
			}
			res.send(response.clientToken);
		});
	},

	checkout: (req, res) => {
		
		const nonce = req.body.params.nonce;
		const payoutEmail = 'alberto.m.esquivias-buyer@gmail.com';
		const amountPaid = 10.00
		const saleRequest = {
			amount: amountPaid,
			paymentMethodNonce: nonce,
			options: {
				submitForSettlement: true,
			},
		};

		gateway.transaction.sale(saleRequest, (error, result) => {
			if (error) {
				res.send(error);
			} else if (result.success) {
				console.log("results", result)
				console.log("result.success ", result.success)
				payout(payoutEmail, amountPaid, res);
				console.log("AFTer PAYOUT =============>")
			} else {
				res.send("Error: " + result.message);
			}
		});
	},
};
