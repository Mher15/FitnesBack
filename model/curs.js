import mongoose from "mongoose";

const curs = new mongoose.Schema({
	title: String,
	description: String,
	amount: Number,
	status: Boolean,
	url: String,
	times: Array
});

export default mongoose.model("curs",curs)