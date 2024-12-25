import { Router } from "express";
import RestauranteRoutes from "./RestauranteRoutes.js";
import CategoriaRoutes from "./CategoriaRoutes.js";
import ItensRoutes from "./ItensRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
const routes = new Router();

routes.use("/auth", AuthRoutes);
routes.use("/restaurantes", RestauranteRoutes);

routes.use(authMiddleware);
routes.use("/", CategoriaRoutes);
routes.use("/", ItensRoutes);

export default routes;
