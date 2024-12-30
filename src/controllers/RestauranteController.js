import ImagemService from "../services/ImagemService.js";
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

  async updateRestauranteEndereco(req, res) {
    const id = req.restaurante_id;
    const { file } = req;
    let url_img_restaurante = req.body.img_restaurante;

    try {
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }

      if (file) {
        const restaurante = await RestauranteService.getRestauranteById(id);

        if (restaurante && restaurante.endereco.img_restaurante) {
          await ImagemService.removerImagem(
            restaurante.endereco.img_restaurante
          );
        }

        url_img_restaurante = ImagemService.gerarCaminhoImagem(
          id,
          file.filename
        );
      }

      const updatedEnderecoData = {
        ...req.body,
        img_restaurante: url_img_restaurante,
      };

      const restauranteAtualizado =
        await RestauranteService.updateRestauranteEndereco(
          id,
          updatedEnderecoData
        );

      res.status(200).json({
        message: "Endereço atualizado com sucesso.",
        data: restauranteAtualizado,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRestauranteRedeSocial(req, res) {
    const id = req.restaurante_id;
    const { rede_sociais } = req.body;

    try {
      const restauranteAtualizado =
        await RestauranteService.updateRestauranteRedeSocial(id, rede_sociais);

      res.status(200).json({
        message: "Rede social atualizada com sucesso.",
        data: restauranteAtualizado,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRestauranteLogin(req, res) {
    const id = req.restaurante_id;
    const login = req.body;

    try {
      const restauranteAtualizado =
        await RestauranteService.updateRestauranteLogin(id, login);

      res.status(200).json({
        message: "Login atualizado com sucesso.",
        data: restauranteAtualizado,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new RestauranteController();
