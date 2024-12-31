import { Router } from "express";
import EnderecoController from "../controllers/EnderecoController.js";
import upload from "../middleware/uploadMiddleware.js";

const routes = new Router();

routes.get("/", EnderecoController.getEndereco);
routes.put(
  "/",
  upload.single("img_restaurante"),
  EnderecoController.updateEndereco
);

export default routes;
