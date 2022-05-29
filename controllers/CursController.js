import mongoose from "mongoose";
import curs from "../model/curs.js";

export class CursController {
	static curs(req, res) {
		const newCurs = new curs({
			title: "title2",
			description: "description3",
			amount: 1000,
			status: true
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
	static GetAllCurs(req, res) {
		curs.find().then((data)=>{
			res.send(data)
		})
	}
}