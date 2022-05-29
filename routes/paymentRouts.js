import express from "express";
const route = express.Router();

import { PaymentController } from "../controllers/PaymentController.js";

route.post("/", PaymentController.index);

export default route;
