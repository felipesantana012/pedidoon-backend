import CategoriaService from "./CategoriaService.js";
import EnderecoService from "./EnderecoService.js";
import OutrasConfigService from "./OutrasConfigService.js";
import RedeSocialService from "./RedeSocialService.js";
import PromocaoDiaService from "./PromocaoDiaService.js";
import { gerarMenssagemError } from "../utils/ErrorUtil.js";
import BairrosEntregaService from "./BairrosEntregaService.js";

class DadosRestauranteClienteService {
  async getDadosRestauranteCliente(url) {
    try {
      const restaurante_id = await OutrasConfigService.getRestauranteIdByUrl(
        url
      );
      const dados = {};
      const categorias =
        await CategoriaService.getAllCategoriasItensDisponiveis(restaurante_id);
      const endereco = await EnderecoService.getEndereco(restaurante_id);
      const rede_sociais = await RedeSocialService.getRedeSocial(
        restaurante_id
      );
      const outrasConfig = await OutrasConfigService.getOutrasConfig(
        restaurante_id
      );
      const promocao_dia = await PromocaoDiaService.buscarPromocaoDia(
        restaurante_id
      );

      const bairros_entrega = await BairrosEntregaService.getAllBairrosEntrega(
        restaurante_id
      );

      dados.categorias = categorias;
      dados.endereco = endereco;
      dados.rede_sociais = rede_sociais;
      dados.outras_config = outrasConfig;
      dados.promocao_dia = promocao_dia;
      dados.bairros_entrega = bairros_entrega;

      return dados;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new DadosRestauranteClienteService();
