const Stripe = require("Stripe")(process.env.STRIPE_SECRET_KEY);

// export const prices = async (req, res) => {
// 	const prices = await Stripe.prices.list();
// 	res.json(prices.data.reverse());
// }

// export const createSubscription = async (req, res) => {
//    console.log(req.body);
// }

module.exports = Stripe;