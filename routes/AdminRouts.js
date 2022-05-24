import express from "express";
const route = express.Router();

import { AdminController } from "../controllers/AdminController.js";

route.get("/", AdminController.index);

export default route;
