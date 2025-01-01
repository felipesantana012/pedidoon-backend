import ImagemService from "../services/ImagemService.js";
import OutrasConfigService from "../services/OutrasConfigService.js";
import { statusError } from "../utils/ErrorUtil.js";

class OutrasConfigController {
  async getOutrasConfig(req, res) {
    try {
      const restaurante_id = req.restaurante_id;
      const config = await OutrasConfigService.getOutrasConfig(restaurante_id);
      res.status(200).json(config);
    } catch (error) {
      res.status(statusError(error)).json({ message: error.message });
    }
  }

  async updateOutrasConfig(req, res) {
    const restaurante_id = req.restaurante_id;
    const { file } = req;
    let url_img_logo = req.body.img_logo;

    try {
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }

      if (file) {
        const config = await OutrasConfigService.getOutrasConfig(
          restaurante_id
        );

        if (config && config.img_logo) {
          await ImagemService.removerImagem(config.img_logo);
        }

        url_img_logo = ImagemService.gerarCaminhoImagem(
          restaurante_id,
          file.filename
        );
      }

      const updatedConfigData = {
        ...req.body,
        img_logo: url_img_logo,
      };

      const configAtualizada = await OutrasConfigService.updateOutrasConfig(
        restaurante_id,
        updatedConfigData
      );

      res.status(200).json({
        message: "Configurações atualizadas com sucesso.",
        data: configAtualizada,
      });
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new OutrasConfigController();
