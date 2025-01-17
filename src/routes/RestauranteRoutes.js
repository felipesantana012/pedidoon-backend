import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = new Router();

routes.get("/email", authMiddleware, RestauranteController.getRestauranteEmail);

routes.put(
  "/email",
  authMiddleware,
  RestauranteController.updateRestauranteEmail
);

routes.put(
  "/senha",
  authMiddleware,
  RestauranteController.updateRestauranteSenha
);

routes.get("/", RestauranteController.getAllRestaurantes);
routes.get("/:id", RestauranteController.getRestauranteById);
routes.post("/", RestauranteController.createRestaurante);
routes.delete("/:id", RestauranteController.deleteRestaurante);
export default routes;
