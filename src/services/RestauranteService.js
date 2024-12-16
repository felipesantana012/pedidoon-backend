import RestauranteRepository from "../repositories/RestauranteRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";

class RestauranteService {
  async getAllRestaurantes() {
    try {
      return await RestauranteRepository.findAll();
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getRestauranteById(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      const restaurante = await RestauranteRepository.findById(id);
      if (!restaurante) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }
      return restaurante;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createRestaurante(restauranteData) {
    try {
      if (!restauranteData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }
      validarCampos(restauranteData, [
        "email",
        "senha",
        "nomeRestaurante",
        "nomeProprietario",
        "endereco",
        "rede_sociais",
      ]);
      validarCampos(restauranteData.endereco, [
        "rua",
        "bairro",
        "cidade",
        "estado",
      ]);

      validarCampos(restauranteData.rede_sociais, ["whatsapp"]);

      if (restauranteData.senha.length < 4) {
        throw new Error(gerarMenssagemError("PASSWORD_TOO_SHORT"));
      }

      const emailExistente = await RestauranteRepository.findByEmail(
        restauranteData.email
      );
      if (emailExistente) {
        throw new Error(gerarMenssagemError("DUPLICATE_EMAIL"));
      }

      return await RestauranteRepository.create(restauranteData);
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async deleteRestaurante(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const deletedCount = await RestauranteRepository.delete(id);
      if (deletedCount === 0) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return { message: "Restaurante deletado com sucesso." };
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateRestauranteEndereco(id, enderecoData) {
    try {
      if (!enderecoData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const dadosRestaurante = await RestauranteRepository.findById(id);
      if (!dadosRestaurante) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      validarCampos(enderecoData, [
        "rua",
        "bairro",
        "cidade",
        "estado",
        "linkmaps",
      ]);

      return await RestauranteRepository.updateRestauranteEndereco(
        id,
        enderecoData
      );
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateRestauranteRedeSocial(id, redeSocialData) {
    try {
      if (!redeSocialData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }

      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const dadosRestaurante = await RestauranteRepository.findById(id);
      if (!dadosRestaurante) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      validarCampos(redeSocialData, ["whatsapp"]);

      return await RestauranteRepository.updateRestauranteRedeSocial(
        id,
        redeSocialData
      );
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new RestauranteService();
