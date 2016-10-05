const braintree = require("braintree");

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.braintree_MerchantId,
	publicKey: process.env.braintree_Public_Key,
	privateKey: process.env.braintree_Private_Key,
	accessToken: process.env.SandBox_Access_Token,
});

module.exports = {

	generateToken: (req, res) => {
		gateway.clientToken.generate({}, (error, response) => {
			if (error) {
				res.end(error);
			}
			res.json(response.clientToken);
		});
	},

	checkout: (req, res) => {
		//console.log("REQ.BODY.amount --------> ", req.body);
		
		const nonce = req.body.params.nonce;
		const saleRequest = {
			amount: 15.00,
			paymentMethodNonce: nonce,
		};

		gateway.transaction.sale(saleRequest, (error, result) => {
				console.log("RESULTS ========>", result);
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
