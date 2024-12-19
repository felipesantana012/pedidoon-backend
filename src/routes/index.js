import { Router } from "express";
import RestauranteRoutes from "./RestauranteRoutes.js";
import CategoriaRoutes from "./CategoriaRoutes.js";
import ItensRoutes from "./ItensRoutes.js";
const routes = new Router();

routes.use("/restaurantes", RestauranteRoutes);

routes.use("/", CategoriaRoutes);
routes.use("/", ItensRoutes);

export default routes;
