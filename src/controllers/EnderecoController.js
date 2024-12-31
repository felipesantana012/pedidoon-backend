import EnderecoService from "../services/EnderecoService.js";
import ImagemService from "../services/ImagemService.js";
import RestauranteService from "../services/RestauranteService.js";
import { statusError } from "../utils/ErrorUtil.js";

class EnderecoController {
  async getEndereco(req, res) {
    const restaurante_id = req.restaurante_id;
    try {
      const endereco = await EnderecoService.getEndereco(restaurante_id);
      res.status(200).json(endereco);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateEndereco(req, res) {
    const restaurante_id = req.restaurante_id;
    const { file } = req;
    let url_img_restaurante = req.body.img_restaurante;

    try {
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }

      if (file) {
        const restaurante = await RestauranteService.getRestauranteById(
          restaurante_id
        );

        if (restaurante && restaurante.endereco.img_restaurante) {
          await ImagemService.removerImagem(
            restaurante.endereco.img_restaurante
          );
        }

        url_img_restaurante = ImagemService.gerarCaminhoImagem(
          restaurante_id,
          file.filename
        );
      }

      const updatedEnderecoData = {
        ...req.body,
        img_restaurante: url_img_restaurante,
      };

      const enderecoAtualizado = await EnderecoService.updateEndereco(
        restaurante_id,
        updatedEnderecoData
      );

      res.status(200).json({
        message: "Endereço atualizado com sucesso.",
        data: enderecoAtualizado,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new EnderecoController();
