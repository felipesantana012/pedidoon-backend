import { Router } from "express";
import BairrosEntregaController from "../controllers/BairrosEntregaController.js";

const routes = new Router();

routes.get("/", BairrosEntregaController.getAllBairroEntrega);
routes.get("/:id", BairrosEntregaController.getBairroEntregaById);
routes.post("/", BairrosEntregaController.createBairroEntrega);
routes.put("/:id", BairrosEntregaController.updateBairroEntrega);
routes.delete("/:id", BairrosEntregaController.deleteBairroEntrega);

export default routes;
