import { Router } from "express";
import DadosRestauranteClienteController from "../controllers/DadosRestauranteClienteController.js";

const routes = new Router();

routes.get(
  "/:url",
  DadosRestauranteClienteController.getDadosRestauranteCliente
);

export default routes;
