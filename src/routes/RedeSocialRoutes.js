import { Router } from "express";
import RedeSocialController from "../controllers/RedeSocialController.js";

const routes = new Router();

routes.get("/", RedeSocialController.getRedeSocial);
routes.put("/", RedeSocialController.updateRedeSocial);

export default routes;
