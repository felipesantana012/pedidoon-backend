import Pagamento from "../models/PagamentoModel.js";

class PagamentoRepository {
  async getAllPagamentos(restaurante_id) {
    return await Pagamento.findAll({
      where: { restaurante_id },
    });
  }

  async getAllPagamentosAtivos(restaurante_id) {
    return await Pagamento.findAll({
      where: { restaurante_id, ativo: true },
    });
  }

  async getPagamentoById(id, restaurante_id) {
    return await Pagamento.findOne({
      where: { id, restaurante_id },
    });
  }

  async createPagamento(restaurante_id, dadosPagamento) {
    return await Pagamento.create({
      ...dadosPagamento,
      restaurante_id,
    });
  }

  async updatePagamento(id, restaurante_id, dadosAtualizacao) {
    if (dadosAtualizacao) {
      const [linhasAfetadas] = await Pagamento.update(dadosAtualizacao, {
        where: {
          id,
          restaurante_id,
        },
      });

      if (linhasAfetadas > 0) {
        return await this.getPagamentoById(id, restaurante_id);
      }
    }

    return null;
  }

  async deletePagamento(id, restaurante_id) {
    return await Pagamento.destroy({
      where: {
        id,
        restaurante_id,
      },
    });
  }
}

export default new PagamentoRepository();
