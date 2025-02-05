import PagamentoRepository from "../repositories/PagamentoRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class PagamentoService {
  async getAllPagamentos(restaurante_id) {
    try {
      await RestauranteService.getRestauranteById(restaurante_id);
      const pagamentos = await PagamentoRepository.getAllPagamentos(
        restaurante_id
      );
      return pagamentos;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getAllPagamentosAtivos(restaurante_id) {
    try {
      await RestauranteService.getRestauranteById(restaurante_id);
      const pagamentos = await PagamentoRepository.getAllPagamentosAtivos(
        restaurante_id
      );
      return pagamentos;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getPagamentoById(id, restaurante_id) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const pagamento = await PagamentoRepository.getPagamentoById(
        id,
        restaurante_id
      );

      if (!pagamento) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return pagamento;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createPagamento(restaurante_id, dadosPagamento) {
    try {
      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      validarCampos(dadosPagamento, ["forma"]);

      const pagamento = await PagamentoRepository.createPagamento(
        restaurante_id,
        dadosPagamento
      );
      return pagamento;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updatePagamento(id, restaurante_id, dadosAtualizacao) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const pagamentoExistente = await PagamentoRepository.getPagamentoById(
        id,
        restaurante_id
      );

      if (!pagamentoExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      validarCampos(dadosAtualizacao, ["forma"]);

      const pagamento = await PagamentoRepository.updatePagamento(
        id,
        restaurante_id,
        dadosAtualizacao
      );

      if (!pagamento) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return pagamento;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async deletePagamento(id, restaurante_id) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const pagamentoExistente = await PagamentoRepository.getPagamentoById(
        id,
        restaurante_id
      );

      if (!pagamentoExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return await PagamentoRepository.deletePagamento(id, restaurante_id);
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new PagamentoService();
