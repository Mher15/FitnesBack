import mongoose from "mongoose";
import curs from "../model/curs.js";

export class CursController {
	static curs(req, res) {
		const newCurs = new curs({
			title: "title5",
			description: "description5",
			amount: 250,
			status: true,
			url1: "../../assets/images/curs2.jpeg",
			url2: "../../assets/images/curs2.jpeg",
			times:[
				"test curs1",
				"test curs2",
				"test curs3",
			]
		})
		newCurs.save((data, error) => {
			if (error) {
				console.log(error)
			}
			else {
				console.log("connect")
			}
		})
	}
	static getAllCurs(req, res) {
		curs.find().then((data)=>{
			res.send(data)
		})
	}
}