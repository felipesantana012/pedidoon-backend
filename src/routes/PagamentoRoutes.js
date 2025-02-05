import { Router } from "express";
import PagamentoController from "../controllers/PagamentoController.js";
const routes = new Router();

routes.get("/ativo", PagamentoController.getAllPagamentosAtivos);
routes.get("/", PagamentoController.getAllPagamentos);

routes.get("/:id", PagamentoController.getPagamentoById);

routes.post("/", PagamentoController.createPagamento);

routes.put("/:id", PagamentoController.updatePagamento);

routes.delete("/:id", PagamentoController.deletePagamento);

export default routes;
