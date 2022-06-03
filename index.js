import express from "express";
import AdminRoutes from "./routes/AdminRouts.js";
import PaymentRoutes from "./routes/PaymentRouts.js"
import CursRoutes from "./routes/CursRoutes.js"
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'


const app = express();
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.use("/admin", AdminRoutes);
app.use("/payment",PaymentRoutes)
app.use("/curs", CursRoutes)

const port  = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
	console.log("DB Connection Successfull")
})

app.listen(port, error => {
	if(error) throw error;
	console.log('Your server is running on port 5000')
});


