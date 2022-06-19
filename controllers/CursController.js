import mongoose from "mongoose";
import curs from "../model/curs.js";

export class CursController {
	static curs(req, res) {
		const newCurs = new curs({
			title: "Simakey Schedul",
			description: "description5",
			amount: 250,
			status: true,
			url1: "http://localhost:2001/images/bookyourfreetraining1.jpg",
			url2: "http://localhost:2001/images/bookyourfreetraining2.jpg",
			times:[
				"test curs1",
				"test curs2",
				"test curs3",
			]
			,
			free:false
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