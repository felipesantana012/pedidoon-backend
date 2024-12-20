import { Router } from "express";
import ItensController from "../controllers/ItensController.js";
const routes = new Router();

routes.get(
  "/restaurantes/:restaurante_id/categorias/:categoria_id/itens",
  ItensController.getAllItens
);
routes.get(
  "/restaurantes/:restaurante_id/categorias/:categoria_id/itens/disponiveis",
  ItensController.getAllItensDisponiveis
);

routes.get(
  "/restaurantes/:restaurante_id/categorias/:categoria_id/itens/:id",
  ItensController.getByIdItem
);

routes.post(
  "/restaurantes/:restaurante_id/categorias/:categoria_id/itens",
  ItensController.createItem
);

// routes.put(
//   "/restaurantes/:restaurante_id/categorias/:categoria_id/itens/:id",
//   ItensController.updateCategoria
// );

// routes.delete(
//   "/restaurantes/:restaurante_id/categorias/:categoria_id/itens/:id",
//   ItensController.deleteCategoria
// );

export default routes;
