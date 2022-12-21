import express from "express";
import AdminRoutes from "./routes/AdminRouts.js";
import CursRoutes from "./routes/CursRoutes.js";
import OrderRoutes from "./routes/OrderRouts.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import  path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*',(req, res)=>{
	res.sendFile(path.join(__dirname,'build','index.html'));
});
app.get('/test',(req, res)=>{
	res.send('hello world!');
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use("/admin", AdminRoutes);
// app.use("/payment",PaymentRoutes)
app.use("/curs", CursRoutes)
app.use("/order", OrderRoutes)

app.use('/images', express.static('images'));


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

const port  = 9000;

mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
	console.log("DB Connection Successfull")
})

app.listen(port, error => {
	if(error) throw error;
	console.log('Your server is running on port 7007')
});



