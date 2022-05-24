import express from "express";
import AdminRoutes from "./routes/AdminRouts.js";
import cors from "cors"

const app = express();
app.use(cors())

app.use("/admin", AdminRoutes);

app.listen(2002);
