import express from "express";
const route = express.Router();

import { AdminController } from "../controllers/AdminController.js";

route.get("/", AdminController.index);
route.post("/update", AdminController.update);
route.post("/delete", AdminController.delete);
route.post("/freeMail", AdminController.freeMail);
route.post("/paymentMail", AdminController.paymentMail);

export default route;
