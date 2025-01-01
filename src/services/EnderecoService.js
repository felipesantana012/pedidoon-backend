import EnderecoRepository from "../repositories/EnderecoRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class EnderecoService {
  async getEndereco(restaurante_id) {
    try {
      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const endereco = await EnderecoRepository.getEndereco(restaurante_id);
      if (!endereco) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return endereco;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateEndereco(restaurante_id, enderecoData) {
    try {
      if (!enderecoData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      await RestauranteService.getRestauranteById(restaurante_id);

      validarCampos(enderecoData, [
        "rua",
        "bairro",
        "cidade",
        "estado",
        "linkmaps",
      ]);

      const enderecoAtualizado = await EnderecoRepository.updateEndereco(
        restaurante_id,
        enderecoData
      );

      if (!enderecoAtualizado) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return enderecoAtualizado;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new EnderecoService();
