import RestauranteService from "../services/RestauranteService.js";

class RestauranteController {
  async getAllRestaurantes(req, res) {
    try {
      const restaurantes = await RestauranteService.getAllRestaurantes();
      res.status(200).json(restaurantes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRestauranteById(req, res) {
    const { id } = req.params;
    try {
      const restaurante = await RestauranteService.getRestauranteById(id);
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(404).json({ error: error.message });
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
      res.status(400).json({ error: error.message });
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
      if (error.message.includes("não encontrado")) {
        res.status(404).json({ error: error.message });
      } else if (
        error.message.includes("obrigatório") ||
        error.message.includes("inválido")
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Erro interno no servidor." });
      }
    }
  }

  async updateRestaurante(req, res) {
    const { id } = req.params;
    const restauranteData = req.body;
    try {
      const restaurante = await RestauranteService.updateRestaurante(
        id,
        restauranteData
      );
      res.status(200).json(restaurante);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteRestaurante(req, res) {
    const { id } = req.params;
    try {
      await RestauranteService.deleteRestaurante(id);
      res.status(200).json({ message: "Restaurante deletado com sucesso." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new RestauranteController();
