import { Router } from "express";
import ItensController from "../controllers/ItensController.js";
import upload from "../middleware/uploadMiddleware.js";
const routes = new Router();

routes.get("/itens", ItensController.getAllItensAllRestaurante);
routes.get("/categorias/:categoria_id/itens", ItensController.getAllItens);
routes.get(
  "/categorias/:categoria_id/itens/disponiveis",
  ItensController.getAllItensDisponiveis
);

routes.get("/categorias/:categoria_id/itens/:id", ItensController.getByIdItem);

routes.post(
  "/categorias/:categoria_id/itens",
  upload.single("img"),
  ItensController.createItem
);

routes.put(
  "/categorias/:categoria_id/itens/:id",
  upload.single("img"),
  ItensController.updateItem
);

routes.delete(
  "/categorias/:categoria_id/itens/:id",
  ItensController.deleteItem
);

export default routes;
