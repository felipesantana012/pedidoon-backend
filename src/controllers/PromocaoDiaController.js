import PromocaoDiaService from "../services/PromocaoDiaService.js";
import { statusError } from "../utils/ErrorUtil.js";

class PromocaoDiaController {
  async definirPromocaoDia(req, res) {
    const restaurante_id = req.restaurante_id;
    const { item_id } = req.body;
    try {
      await PromocaoDiaService.definirPromocaoDia(restaurante_id, item_id);
      res.status(200).json({
        message: item_id
          ? "Promoção do dia definida com sucesso!"
          : "Promoção do dia removida com sucesso!",
      });
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async buscarPromocaoDia(req, res) {
    const restaurante_id = req.restaurante_id;
    try {
      const promocao = await PromocaoDiaService.buscarPromocaoDia(
        restaurante_id
      );
      res.status(200).json(promocao);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new PromocaoDiaController();
