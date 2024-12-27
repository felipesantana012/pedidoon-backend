import express from "express";
import PromocaoDiaController from "../controllers/PromocaoDiaController.js";

const router = express.Router();

// Define ou remove a promoção do dia
router.put("/", PromocaoDiaController.definirPromocaoDia);

// Busca a promoção do dia
router.get("/", PromocaoDiaController.buscarPromocaoDia);

export default router;
