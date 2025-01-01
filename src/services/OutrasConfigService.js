import OutrasConfigRepository from "../repositories/OutrasConfigRepository.js";
import { gerarMenssagemError } from "../utils/ErrorUtil.js";

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
}

export default new OutrasConfigService();
