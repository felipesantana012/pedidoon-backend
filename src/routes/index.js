import { Router } from "express";
import RestauranteRoutes from "./RestauranteRoutes.js";
const routes = new Router();

routes.use("/restaurantes", RestauranteRoutes);

export default routes;
