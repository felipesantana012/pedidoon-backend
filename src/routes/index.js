import { Router } from "express";
import AuthRoutes from "./AuthRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import RestauranteRoutes from "./RestauranteRoutes.js";
import EnderecoRoutes from "./EnderecoRoutes.js";
import RedeSocialRoutes from "./RedeSocialRoutes.js";
import OutrasConfigRoutes from "./OutrasConfigRoutes.js";
import CategoriaRoutes from "./CategoriaRoutes.js";
import ItensRoutes from "./ItensRoutes.js";
import PromocaoDiaRoutes from "./PromocaoDiaRoutes.js";
import DadosRestauranteClienteRoutes from "./DadosRestauranteClienteRoutes.js";
import BairrosEntregaRoutes from "./BairrosEntregaRoutes.js";
import PagamentoRoutes from "./PagamentoRoutes.js";

const routes = new Router();

routes.use("/auth", AuthRoutes);
routes.use("/restaurantes", RestauranteRoutes);
routes.use("/dados_restaurante_cliente", DadosRestauranteClienteRoutes);

routes.use(authMiddleware);
routes.use("/endereco", EnderecoRoutes);
routes.use("/rede_sociais", RedeSocialRoutes);
routes.use("/outras_config", OutrasConfigRoutes);
routes.use("/pagamento", PagamentoRoutes);
routes.use("/categorias", CategoriaRoutes);
routes.use("/", ItensRoutes);
routes.use("/promocao_dia", PromocaoDiaRoutes);
routes.use("/bairros_entrega", BairrosEntregaRoutes);

export default routes;
