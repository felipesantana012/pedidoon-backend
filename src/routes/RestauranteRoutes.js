import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = new Router();

routes.get("/", RestauranteController.getAllRestaurantes);

routes.get("/:id", RestauranteController.getRestauranteById);

routes.post("/", RestauranteController.createRestaurante);

routes.delete("/:id", RestauranteController.deleteRestaurante);

routes.put(
  "/endereco",
  authMiddleware,
  RestauranteController.updateRestauranteEndereco
);
routes.put(
  "/rede_sociais",
  authMiddleware,
  RestauranteController.updateRestauranteRedeSocial
);

export default routes;
