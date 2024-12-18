import { Router } from "express";
import RestauranteRoutes from "./RestauranteRoutes.js";
import CategoriaRoutes from "./CategoriaRoutes.js";
const routes = new Router();

routes.use("/restaurantes", RestauranteRoutes);

routes.use("/categorias", CategoriaRoutes);

export default routes;
