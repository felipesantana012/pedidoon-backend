import EnderecoRepository from "../repositories/EnderecoRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class EnderecoService {
  async getEndereco(id_restaurante) {
    try {
      if (!id_restaurante || isNaN(id_restaurante)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const endereco = await EnderecoRepository.getEndereco(id_restaurante);
      if (!endereco) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return endereco;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateEndereco(id_restaurante, enderecoData) {
    try {
      if (!enderecoData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!id_restaurante || isNaN(id_restaurante)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      await RestauranteService.getRestauranteById(id_restaurante);

      validarCampos(enderecoData, [
        "rua",
        "bairro",
        "cidade",
        "estado",
        "linkmaps",
      ]);

      const enderecoAtualizado = await EnderecoRepository.updateEndereco(
        id_restaurante,
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
