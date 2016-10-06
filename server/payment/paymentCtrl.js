const braintree = require("braintree");

const gateway = braintree.connect({
	accessToken: process.env.SandBox_Access_Token,
});

module.exports = {

	generateToken: (req, res) => {
		gateway.clientToken.generate({}, (error, response) => {
			if (error) {
				res.end(error);
			}
			//console.log(response.clientToken)
			res.send(response.clientToken);
		});
	},

	checkout: (req, res) => {
		
		const nonce = req.body.params.nonce;
		const saleRequest = {
			amount: 10.00,
			paymentMethodNonce: nonce,
		};

		gateway.transaction.sale(saleRequest, (error, result) => {
			if (error) {
				res.send(error);
			} else if (result.success) {
				res.send("Transaction ID: " + result.transaction.id);
			} else {
				res.send("Error: " + result.message);
			}
		});
	},
};
