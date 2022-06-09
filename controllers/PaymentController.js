
// import Stripe from "stripe"

// export class PaymentController {
//   static async index (req, res) {
// 	await req
// 	let { amount, id } = req.body
//    try {
//      const payment = stripe.paymentIntents.create({
// 			amount: 500,
// 			currency: "USD",
// 			description: "Spatula company",
// 			payment_method: id,
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.json({
// 			message: "Payment successful",
// 			success: true
// 		})
//    } catch (error){
//     console.log("Error", error)
// 		res.json({
// 			message: "Payment failed",
// 			success: false
// 		})
//    }
//   }
// }