import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";
const routes = new Router();

routes.get("/", CategoriaController.getAllCategorias);

routes.get("/:id", CategoriaController.getByIdCategoria);

export default routes;
