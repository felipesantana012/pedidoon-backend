import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";
const routes = new Router();

routes.get("/:restaurante_id", CategoriaController.getAllCategorias);

routes.get("/:restaurante_id/:id", CategoriaController.getByIdCategoria);

routes.post("/:restaurante_id", CategoriaController.createCategoria);

export default routes;
