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

  async deleteRestaurante(req, res) {
    const { id } = req.params;
    try {
      await RestauranteService.deleteRestaurante(id);
      res.status(200).json({ message: "Restaurante deletado com sucesso." });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getRestauranteEmail(req, res) {
    const id = req.restaurante_id;
    try {
      const restaurante = await RestauranteService.getRestauranteEmail(id);
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRestauranteEmail(req, res) {
    const id = req.restaurante_id;
    const email = req.body;

    try {
      const restauranteAtualizado =
        await RestauranteService.updateRestauranteEmail(id, email);

      res.status(200).json({
        message: "Email atualizado com sucesso.",
        data: restauranteAtualizado,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRestauranteSenha(req, res) {
    const id = req.restaurante_id;
    const senha = req.body;

    try {
      await RestauranteService.updateRestauranteSenha(id, senha);
      res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new RestauranteController();
