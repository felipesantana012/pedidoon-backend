import RestauranteRepository from "../repositories/RestauranteRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import bcrypt from "bcryptjs";

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
        "nome_restaurante",
        "nome_proprietario",
      ]);

      if (restauranteData.senha.length < 4) {
        throw new Error(gerarMenssagemError("PASSWORD_TOO_SHORT"));
      }

      const emailExistente = await RestauranteRepository.findByEmail(
        restauranteData.email
      );
      if (emailExistente) {
        throw new Error(gerarMenssagemError("DUPLICATE_EMAIL"));
      }

      // Criptografar a senha antes de salvar
      const salt = await bcrypt.genSalt(10); // Gera um salt com fator de custo 10
      restauranteData.senha = await bcrypt.hash(restauranteData.senha, salt);

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

  async updateRestauranteLogin(id, loginData) {
    try {
      if (!loginData) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      validarCampos(loginData, ["email", "senha"]);

      if (loginData.email) {
        const emailExistente = await RestauranteRepository.findByEmail(
          loginData.email
        );
        if (emailExistente && emailExistente.id !== id) {
          throw new Error(gerarMenssagemError("DUPLICATE_EMAIL"));
        }
      }

      if (loginData.senha.length < 4) {
        throw new Error(gerarMenssagemError("PASSWORD_TOO_SHORT"));
      }

      // Criptografar a senha antes de salvar
      const salt = await bcrypt.genSalt(10); // Gera um salt com fator de custo 10
      loginData.senha = await bcrypt.hash(loginData.senha, salt);

      const loginAtualizado =
        await RestauranteRepository.updateRestauranteLogin(id, loginData);

      if (!loginAtualizado) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return loginAtualizado;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new RestauranteService();
