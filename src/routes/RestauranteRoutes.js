import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
const routes = new Router();

routes.get("/", RestauranteController.getAllRestaurantes);

routes.get("/:id", RestauranteController.getRestauranteById);

routes.post("/", RestauranteController.createRestaurante);

routes.delete("/:id", RestauranteController.deleteRestaurante);

routes.put("/:id/endereco", RestauranteController.updateRestauranteEndereco);
routes.put(
  "/:id/rede-sociais",
  RestauranteController.updateRestauranteRedeSocial
);

export default routes;
