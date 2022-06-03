import mongoose from "mongoose";
import curs from "../model/curs.js";

export class OrderController {
	static order(req, res) {
		const newOrder = new order({
			name: "karen jamalyan",
			email: "karen@asd.ss",
			phone: "77777777777777",
			time: "20/04/2022",
			age: "20-20"
		})
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