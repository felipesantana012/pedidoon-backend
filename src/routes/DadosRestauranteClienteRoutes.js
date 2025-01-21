import { Router } from "express";
import DadosRestauranteClienteController from "../controllers/DadosRestauranteClienteController.js";

const routes = new Router();

routes.get(
  "/:restaurante_id",
  DadosRestauranteClienteController.getDadosRestauranteCliente
);

export default routes;
