import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";
const routes = new Router();

routes.get(
  "/restaurantes/:restaurante_id/categorias",
  CategoriaController.getAllCategorias
);

routes.get(
  "/restaurantes/:restaurante_id/categorias/:id",
  CategoriaController.getByIdCategoria
);

routes.post(
  "/restaurantes/:restaurante_id/categorias",
  CategoriaController.createCategoria
);

routes.put(
  "/restaurantes/:restaurante_id/categorias/:id",
  CategoriaController.updateCategoria
);

routes.delete(
  "/restaurantes/:restaurante_id/categorias/:id",
  CategoriaController.deleteCategoria
);

export default routes;
