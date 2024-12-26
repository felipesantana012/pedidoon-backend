import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";
const routes = new Router();

routes.get("/", CategoriaController.getAllCategorias);

routes.get("/:id", CategoriaController.getByIdCategoria);

routes.post("/", CategoriaController.createCategoria);

routes.put("/:id", CategoriaController.updateCategoria);

routes.delete("/:id", CategoriaController.deleteCategoria);

export default routes;
