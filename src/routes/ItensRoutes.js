import { Router } from "express";
import ItensController from "../controllers/ItensController.js";
const routes = new Router();

routes.get("/categorias/:categoria_id/itens", ItensController.getAllItens);
routes.get(
  "/categorias/:categoria_id/itens/disponiveis",
  ItensController.getAllItensDisponiveis
);

routes.get("/categorias/:categoria_id/itens/:id", ItensController.getByIdItem);

routes.post("/categorias/:categoria_id/itens", ItensController.createItem);

routes.put("/categorias/:categoria_id/itens/:id", ItensController.updateItem);

routes.delete(
  "/categorias/:categoria_id/itens/:id",
  ItensController.deleteItem
);

export default routes;
