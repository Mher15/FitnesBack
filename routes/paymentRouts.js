import express from "express";
const route = express.Router();

import Payment from "../controllers/payment.js";

route.get("/payment", Payment.index);

export default route;
