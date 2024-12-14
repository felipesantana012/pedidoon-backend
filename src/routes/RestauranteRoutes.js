import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
const routes = new Router();

routes.get("/", RestauranteController.getAllRestaurantes);

routes.get("/:id", RestauranteController.getRestauranteById);

routes.post("/", RestauranteController.createRestaurante);

routes.put("/:id", RestauranteController.updateRestaurante);

routes.delete("/:id", RestauranteController.deleteRestaurante);

export default routes;
