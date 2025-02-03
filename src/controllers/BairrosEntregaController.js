import BairrosEntregaService from "../services/BairrosEntregaService.js";
import { statusError } from "../utils/ErrorUtil.js";

class BairrosEntregaController {
  async getAllBairroEntrega(req, res) {
    try {
      const restaurante_id = req.restaurante_id;
      const bairros = await BairrosEntregaService.getAllBairrosEntrega(
        restaurante_id
      );
      return res.status(200).json(bairros);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getBairroEntregaById(req, res) {
    try {
      const { id } = req.params;
      const restaurante_id = req.restaurante_id;
      const bairro = await BairrosEntregaService.getBairroEntregaById(
        id,
        restaurante_id
      );
      return res.status(200).json(bairro);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createBairroEntrega(req, res) {
    try {
      const restaurante_id = req.restaurante_id;
      const dadosBairroEntrega = req.body;
      const bairro = await BairrosEntregaService.createBairroEntrega(
        restaurante_id,
        dadosBairroEntrega
      );
      return res.status(201).json(bairro);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateBairroEntrega(req, res) {
    try {
      const { id } = req.params;
      const restaurante_id = req.restaurante_id;
      const dadosBairroEntrega = req.body;
      const bairro = await BairrosEntregaService.updateBairroEntrega(
        id,
        restaurante_id,
        dadosBairroEntrega
      );
      return res.status(200).json(bairro);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async deleteBairroEntrega(req, res) {
    try {
      const { id } = req.params;
      const restaurante_id = req.restaurante_id;
      await BairrosEntregaService.deleteBairroEntrega(id, restaurante_id);
      return res.status(204).send();
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new BairrosEntregaController();
