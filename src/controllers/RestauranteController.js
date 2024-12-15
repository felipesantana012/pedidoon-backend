import RestauranteService from "../services/RestauranteService.js";
import { statusError } from "../utils/ErrorUtil.js";

class RestauranteController {
  async getAllRestaurantes(req, res) {
    try {
      const restaurantes = await RestauranteService.getAllRestaurantes();
      res.status(200).json(restaurantes);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getRestauranteById(req, res) {
    const { id } = req.params;
    try {
      const restaurante = await RestauranteService.getRestauranteById(id);
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createRestaurante(req, res) {
    const restauranteData = req.body;
    try {
      const restaurante = await RestauranteService.createRestaurante(
        restauranteData
      );
      res.status(201).json(restaurante);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRestauranteEndereco(req, res) {
    const { id } = req.params;
    const restauranteData = req.body;

    try {
      const restaurante = await RestauranteService.updateRestauranteEndereco(
        id,
        restauranteData
      );
      res.status(200).json({
        message: "Endereço atualizado com sucesso.",
        data: restaurante,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async deleteRestaurante(req, res) {
    const { id } = req.params;
    try {
      await RestauranteService.deleteRestaurante(id);
      res.status(200).json({ message: "Restaurante deletado com sucesso." });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new RestauranteController();
