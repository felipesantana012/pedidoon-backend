import ItensRepository from "../repositories/ItensRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";

class ItensService {
  async getAllItens(categoria_id) {
    try {
      const itens = await ItensRepository.findAllItens(categoria_id);
      return itens;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getAllItensDisponiveis(categoria_id) {
    try {
      const itens = await ItensRepository.findAllItensDisponiveis(categoria_id);
      return itens;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getByIdItem(id, categoria_id) {
    try {
      if (!id || isNaN(id) || !categoria_id || isNaN(categoria_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      const item = await ItensRepository.findByIdItem(id, categoria_id);
      if (!item) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }
      return item;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createItem(categoria_id, dadosItem) {
    try {
      if (!dadosItem || !categoria_id || isNaN(categoria_id)) {
        throw new Error(gerarMenssagemError("INVALID_DATA"));
      }
      validarCampos(dadosItem, ["nome", "preco", "descricao", "tipo", "img"]);
      dadosItem.preco = parseFloat(dadosItem.preco);
      const item = await ItensRepository.createItem(categoria_id, dadosItem);
      return item;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new ItensService();
