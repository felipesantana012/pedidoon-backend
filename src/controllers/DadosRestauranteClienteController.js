import DadosRestauranteClienteService from "../services/DadosRestauranteClienteService.js";
import { statusError } from "../utils/ErrorUtil.js";

export class DadosRestauranteClienteController {
  async getDadosRestauranteCliente(req, res) {
    const { restaurante_id } = req.params;
    try {
      const dados =
        await DadosRestauranteClienteService.getDadosRestauranteCliente(
          restaurante_id
        );
      return res.status(200).json(dados);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new DadosRestauranteClienteController();
