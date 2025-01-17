import RedeSocialRepository from "../repositories/RedeSocialRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class RedeSocialService {
  async getRedeSocial(id_restaurante) {
    try {
      if (!id_restaurante || isNaN(id_restaurante)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const redeSocial = await RedeSocialRepository.getRedeSocial(
        id_restaurante
      );
      if (!redeSocial) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return redeSocial;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateRedeSocial(id_restaurante, redesocial) {
    try {
      if (!redesocial) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!id_restaurante || isNaN(id_restaurante)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      await RestauranteService.getRestauranteById(id_restaurante);

      validarCampos(redesocial, ["whatsapp"]);
      const redeSocial = await RedeSocialRepository.updateRedeSocial(
        id_restaurante,
        redesocial
      );
      if (!redeSocial) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return redeSocial;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new RedeSocialService();
