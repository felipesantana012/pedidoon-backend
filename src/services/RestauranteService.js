import RestauranteRepository from "../repositories/RestauranteRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import fs from "fs/promises";
import path from "path";
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
      validarCampos(restauranteData, ["email", "senha"]);

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
      const pastaRestaurante = path.join(
        process.cwd(),
        "src/uploads",
        `restaurante_${id}`
      );

      await fs.rm(pastaRestaurante, { recursive: true, force: true });
      console.log(
        `Pasta de imagens do restaurante ${id} foi removida com sucesso.`
      );
      const deletedCount = await RestauranteRepository.delete(id);
      if (deletedCount === 0) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return { message: "Restaurante deletado com sucesso." };
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getRestauranteEmail(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      const login = await RestauranteRepository.getRestauranteEmail(id);
      if (!login) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }
      return login;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateRestauranteEmail(id, email) {
    try {
      if (!email) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      validarCampos(email, ["email"]);

      const emailExistente = await RestauranteRepository.findByEmail(
        email.email
      );
      if (emailExistente && emailExistente.id !== id) {
        throw new Error(gerarMenssagemError("DUPLICATE_EMAIL"));
      }

      const emailAtualizado =
        await RestauranteRepository.updateRestauranteEmail(id, email);

      if (!emailAtualizado) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return emailAtualizado;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateRestauranteSenha(id, senha) {
    try {
      if (!senha) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      validarCampos(senha, ["senha"]);

      if (senha.senha.length < 4) {
        throw new Error(gerarMenssagemError("PASSWORD_TOO_SHORT"));
      }

      // Criptografar a senha antes de salvar
      const salt = await bcrypt.genSalt(10); // Gera um salt com fator de custo 10
      senha.senha = await bcrypt.hash(senha.senha, salt);

      const senhaAtualizada =
        await RestauranteRepository.updateRestauranteSenha(id, senha);

      if (!senhaAtualizada) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return senhaAtualizada;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new RestauranteService();
