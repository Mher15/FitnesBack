import express from "express";
import { CursController } from "../controllers/CursController.js";
const route = express.Router();

route.get("/addNewCurs", CursController.curs );
route.get("/", CursController.getAllCurs);

export default route;
