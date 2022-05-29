import mongoose from "mongoose";

const curs = new mongoose.Schema({
	title: String,
	description: String,
	amount: Number,
	status: Boolean
});

export default mongoose.model("curs",curs)