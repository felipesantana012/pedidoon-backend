import ItensRepository from "../repositories/ItensRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";

class ItensService {
  async getAllItens(categoria_id, restaurante_id) {
    try {
      const itens = await ItensRepository.findAllItens(
        categoria_id,
        restaurante_id
      );
      return itens;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getAllItensDisponiveis(categoria_id, restaurante_id) {
    try {
      const itens = await ItensRepository.findAllItensDisponiveis(
        categoria_id,
        restaurante_id
      );
      return itens;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getByIdItem(id, categoria_id, restaurante_id) {
    try {
      if (
        !id ||
        isNaN(id) ||
        !categoria_id ||
        isNaN(categoria_id) ||
        !restaurante_id ||
        isNaN(restaurante_id)
      ) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      const item = await ItensRepository.findByIdItem(
        id,
        categoria_id,
        restaurante_id
      );
      if (!item) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }
      return item;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createItem(categoria_id, restaurante_id, dadosItem) {
    try {
      if (!dadosItem || isNaN(restaurante_id) || isNaN(categoria_id)) {
        throw new Error(gerarMenssagemError("INVALID_DATA"));
      }
      validarCampos(dadosItem, ["nome", "preco", "descricao", "tipo", "img"]);
      dadosItem.preco = parseFloat(dadosItem.preco);
      const item = await ItensRepository.createItem(
        categoria_id,
        restaurante_id,
        dadosItem
      );
      return item;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateItem(id, categoria_id, restaurante_id, dadosItem) {
    try {
      if (
        !id ||
        isNaN(id) ||
        !categoria_id ||
        isNaN(categoria_id) ||
        !restaurante_id ||
        isNaN(restaurante_id)
      ) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const itemExistente = await ItensRepository.findByIdItem(
        id,
        categoria_id,
        restaurante_id
      );
      if (!itemExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      const item = await ItensRepository.updateItem(
        id,
        categoria_id,
        restaurante_id,
        dadosItem
      );
      if (!item) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }
      validarCampos(dadosItem, ["nome", "preco", "descricao", "tipo", "img"]);
      return item;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async deleteItem(id, categoria_id, restaurante_id) {
    try {
      if (
        !id ||
        isNaN(id) ||
        !categoria_id ||
        isNaN(categoria_id) ||
        !restaurante_id ||
        isNaN(restaurante_id)
      ) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const itemExistente = await ItensRepository.findByIdItem(
        id,
        categoria_id,
        restaurante_id
      );
      if (!itemExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return await ItensRepository.deleteItem(id, categoria_id, restaurante_id);
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new ItensService();
