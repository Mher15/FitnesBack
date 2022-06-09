import express from "express";
import AdminRoutes from "./routes/AdminRouts.js";
// import PaymentRoutes from "./routes/PaymentRouts.js";
import CursRoutes from "./routes/CursRoutes.js";
import OrderRoutes from "./routes/OrderRouts.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)



const app = express();
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use("/admin", AdminRoutes);
// app.use("/payment",PaymentRoutes)
app.use("/curs", CursRoutes)
app.use("/order", OrderRoutes)



app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount: 50,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

const port  = process.env.PORT || 2001;

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
	console.log("DB Connection Successfull")
})

app.listen(port, error => {
	if(error) throw error;
	console.log('Your server is running on port 2001')
});



