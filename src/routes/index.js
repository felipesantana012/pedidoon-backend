import { Router } from "express";
import RestauranteRoutes from "./RestauranteRoutes.js";
import CategoriaRoutes from "./CategoriaRoutes.js";
import EnderecoRoutes from "./EnderecoRoutes.js";
import ItensRoutes from "./ItensRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import PromocaoDiaRoutes from "./PromocaoDiaRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
const routes = new Router();

routes.use("/auth", AuthRoutes);
routes.use("/restaurantes", RestauranteRoutes);

routes.use(authMiddleware);
routes.use("/endereco", EnderecoRoutes);
routes.use("/categorias", CategoriaRoutes);
routes.use("/", ItensRoutes);
routes.use("/promocao_dia", PromocaoDiaRoutes);

export default routes;
