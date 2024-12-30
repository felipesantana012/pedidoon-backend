import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));
app.use("/api", routes);
export default app;
