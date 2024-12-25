import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const routes = new Router();

routes.post("/login", AuthController.login);

export default routes;
