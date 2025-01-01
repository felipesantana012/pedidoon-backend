import { Router } from "express";
import OutrasConfigController from "../controllers/OutrasConfigController.js";

const routes = new Router();

routes.get("/", OutrasConfigController.getOutrasConfig);

export default routes;
