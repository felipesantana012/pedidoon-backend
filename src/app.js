import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.js";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("API funcionando!");
});
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));
app.use("/api", routes);
export default app;
