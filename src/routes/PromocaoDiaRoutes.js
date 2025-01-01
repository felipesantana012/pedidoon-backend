import express from "express";
import PromocaoDiaController from "../controllers/PromocaoDiaController.js";

const router = express.Router();

router.put("/", PromocaoDiaController.definirPromocaoDia);

router.get("/", PromocaoDiaController.buscarPromocaoDia);

export default router;
