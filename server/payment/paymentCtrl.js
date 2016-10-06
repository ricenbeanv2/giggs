const braintree = require("braintree");
const request = require('request');

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
				authorization: 'Bearer ' + tokenPayload.access_token,
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
					},
					receiver: recipient,
					note: 'Payment for work',
					sender_item_id: 'A123' 
				}],
			},
		};

		request.post('https://api.sandbox.paypal.com/v1/payments/payouts?sync_mode=true', payoutOptions, (error, response, body) => {
			console.log("INSIDE SECOND REQUEST");
			if (error) {
				res.send(error);
			}
			//console.log("batch_status: ", body.batch_header.batch_status);
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
		//console.log("REQ PARAMS -=-=-=-=-=-=-=> ", req.body.params)
		const nonce = req.body.params.tokenizationPayload.nonce;
		const payoutEmail = req.body.params.payoutEmail;
		const amountPaid = req.body.params.payment;
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
				console.log("result.success ", result.success)
				payout(payoutEmail, amountPaid, res);
				console.log("INSIDE PAYOUT call res is passed and ended")
			} else {
				res.send("Error: " + result.message);
			}
		});
	},
};
