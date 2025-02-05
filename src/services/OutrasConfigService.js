import OutrasConfigRepository from "../repositories/OutrasConfigRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class OutrasConfigService {
  async getOutrasConfig(restaurante_id) {
    try {
      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const config = await OutrasConfigRepository.getOutrasConfig(
        restaurante_id
      );
      if (!config) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return config;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateOutrasConfig(restaurante_id, outrasConfig) {
    try {
      if (!outrasConfig) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      await RestauranteService.getRestauranteById(restaurante_id);

      validarCampos(outrasConfig, [
        "img_logo",
        "nome_restaurante",
        "nome_proprietario",
        "url",
      ]);

      const urlExistente = await OutrasConfigRepository.findByUrl(
        outrasConfig.url
      );
      if (urlExistente && urlExistente.restaurante_id !== restaurante_id) {
        throw new Error(gerarMenssagemError("DUPLICATE_URL"));
      }
      const configAtualizado = await OutrasConfigRepository.updateOutrasConfig(
        restaurante_id,
        outrasConfig
      );

      if (!configAtualizado) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return configAtualizado;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new OutrasConfigService();
