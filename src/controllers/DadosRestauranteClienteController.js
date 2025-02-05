import DadosRestauranteClienteService from "../services/DadosRestauranteClienteService.js";
import { statusError } from "../utils/ErrorUtil.js";

export class DadosRestauranteClienteController {
  async getDadosRestauranteCliente(req, res) {
    const { url } = req.params;
    try {
      const dados =
        await DadosRestauranteClienteService.getDadosRestauranteCliente(url);
      return res.status(200).json(dados);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new DadosRestauranteClienteController();
