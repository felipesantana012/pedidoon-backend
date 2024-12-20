import ItensService from "../services/ItensService.js";
import { statusError } from "../utils/ErrorUtil.js";

class ItensController {
  async getAllItens(req, res) {
    try {
      const itens = await ItensService.getAllItens(req.params.categoria_id);
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getAllItensDisponiveis(req, res) {
    try {
      const itens = await ItensService.getAllItensDisponiveis(
        req.params.categoria_id
      );
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getByIdItem(req, res) {
    try {
      const item = await ItensService.getByIdItem(
        req.params.id,
        req.params.categoria_id
      );
      return res.status(200).json(item);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createItem(req, res) {
    try {
      const item = await ItensService.createItem(
        req.params.categoria_id,
        req.body
      );
      return res.status(201).json(item);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new ItensController();
