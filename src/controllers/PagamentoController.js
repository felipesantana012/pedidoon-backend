import { statusError } from "../utils/ErrorUtil.js";
import PagamentoService from "../services/PagamanetoService.js";

class PagamentoController {
  async getAllPagamentos(req, res) {
    const restaurante_id = req.restaurante_id;
    try {
      const pagamentos = await PagamentoService.getAllPagamentos(
        restaurante_id
      );
      return res.status(200).json(pagamentos);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getAllPagamentosAtivos(req, res) {
    const restaurante_id = req.restaurante_id;
    try {
      const pagamentos = await PagamentoService.getAllPagamentosAtivos(
        restaurante_id
      );
      return res.status(200).json(pagamentos);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getPagamentoById(req, res) {
    const { id } = req.params;
    const restaurante_id = req.restaurante_id;
    try {
      const pagamento = await PagamentoService.getPagamentoById(
        id,
        restaurante_id
      );
      return res.status(200).json(pagamento);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createPagamento(req, res) {
    const pagamento = req.body;
    const restaurante_id = req.restaurante_id;
    try {
      const novoPagamento = await PagamentoService.createPagamento(
        restaurante_id,
        pagamento
      );
      return res.status(201).json(novoPagamento);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updatePagamento(req, res) {
    const { id } = req.params;
    const pagamento = req.body;
    const restaurante_id = req.restaurante_id;
    try {
      const pagamentoAtualizado = await PagamentoService.updatePagamento(
        id,
        restaurante_id,
        pagamento
      );
      return res.status(200).json(pagamentoAtualizado);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async deletePagamento(req, res) {
    const { id } = req.params;
    const restaurante_id = req.restaurante_id;
    try {
      await PagamentoService.deletePagamento(id, restaurante_id);
      return res.status(204).send();
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new PagamentoController();
