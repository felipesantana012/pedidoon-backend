import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = new Router();

routes.put(
  "/login",
  authMiddleware,
  RestauranteController.updateRestauranteLogin
);

routes.get("/", RestauranteController.getAllRestaurantes);
routes.get("/:id", RestauranteController.getRestauranteById);
routes.post("/", RestauranteController.createRestaurante);
routes.delete("/:id", RestauranteController.deleteRestaurante);
export default routes;
