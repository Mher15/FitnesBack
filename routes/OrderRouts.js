import express from "express";
import { OrderController } from "../controllers/OrderControllers.js";
const route = express.Router();

route.get("/addNewCurs", OrderController.order );
route.get("/", OrderController.getAllOrder)
export default route;
