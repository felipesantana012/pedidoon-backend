import { Router } from "express";
import RestauranteController from "../controllers/RestauranteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const routes = new Router();

routes.get("/", RestauranteController.getAllRestaurantes);

routes.get("/:id", RestauranteController.getRestauranteById);

routes.post("/", RestauranteController.createRestaurante);

routes.delete("/:id", RestauranteController.deleteRestaurante);

routes.use(authMiddleware);
routes.put(
  "/endereco",
  upload.single("img_restaurante"),
  RestauranteController.updateRestauranteEndereco
);
routes.put("/rede_sociais", RestauranteController.updateRestauranteRedeSocial);
routes.put("/login", RestauranteController.updateRestauranteLogin);

export default routes;
