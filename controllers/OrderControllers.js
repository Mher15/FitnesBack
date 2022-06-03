import mongoose from "mongoose";
import curs from "../model/curs.js";
import order from "../model/order.js";

export class OrderController {
	static order(req, res) {
		const newOrder = new order({
			name: req.body.name,
			email: req.body.email,
			phone: req.body.photo,
			time: "20/04/2022",
			age: "20-20",
			orderPay: true
		})
		console.log(req.body)

		newOrder.save((data, error) => {
			if (error) {
				console.log(error)
			}
			else {
				console.log("connect")
			}
		})
	}
	static getAllOrder(req, res) {
		curs.find().then((data)=>{
			res.send(data)
		})
	}
}