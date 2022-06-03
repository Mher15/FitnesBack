import mongoose from "mongoose";

const order = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  time: String,
  age: String,
  orderPay: Boolean,
});

export default mongoose.model("order", order);
