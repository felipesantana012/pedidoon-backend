import { Router } from "express";
import OutrasConfigController from "../controllers/OutrasConfigController.js";
import upload from "../middleware/uploadMiddleware.js";

const routes = new Router();

routes.get("/", OutrasConfigController.getOutrasConfig);
routes.put(
  "/",
  upload.single("img_logo"),
  OutrasConfigController.updateOutrasConfig
);

export default routes;
