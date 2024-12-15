import { ValidationError } from "sequelize";
import RestauranteRepository from "../repositories/RestauranteRepository.js";

class RestauranteService {
  async getAllRestaurantes() {
    try {
      const restaurantes = await RestauranteRepository.findAll();
      return restaurantes;
    } catch (error) {
      throw new Error("Erro ao listar os restaurantes: " + error.message);
    }
  }

  async getRestauranteById(id) {
    try {
      const restaurante = await RestauranteRepository.findById(id);
      if (!restaurante) {
        throw new Error("Restaurante não encontrado.");
      }
      return restaurante;
    } catch (error) {
      throw new Error("Erro ao buscar restaurante: " + error.message);
    }
  }

  async createRestaurante(restauranteData) {
    try {
      if (!restauranteData.email || !restauranteData.senha) {
        throw new Error("Campos obrigatórios faltando: email ou senha.");
      }

      if (restauranteData.senha.length < 4) {
        throw new Error("A senha deve ter no mínimo 4 caracteres.");
      }

      const emailExistente = await RestauranteRepository.findByEmail(
        restauranteData.email
      );
      if (emailExistente) {
        throw new Error("Email já cadastrado. Tente outro email.");
      }
      const restaurante = await RestauranteRepository.create(restauranteData);
      return restaurante;
    } catch (error) {
      throw new Error("Erro ao criar restaurante: " + error.message);
    }
  }
  async updateRestauranteEndereco(id, restauranteData) {
    if (!id || isNaN(id)) {
      throw new Error("ID inválido.");
    }

    const dadosRestaurante = await RestauranteRepository.findById(id);
    if (!dadosRestaurante) {
      throw new Error("Restaurante não encontrado.");
    }

    const endereco = restauranteData.endereco;
    if (
      !endereco ||
      !endereco.rua ||
      !endereco.bairro ||
      !endereco.cidade ||
      !endereco.estado
    ) {
      throw new Error(
        "Todos os campos de endereço (rua, bairro, cidade, estado) são obrigatórios."
      );
    }

    return await RestauranteRepository.updateRestauranteEndereco(
      id,
      restauranteData
    );
  }

  async updateRestaurante(id, restauranteData) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID do restaurante inválido.");
      }

      if (!restauranteData.senha) {
        throw new Error("Campo obrigatório faltando: senha.");
      }

      const dadosRestaurante = await RestauranteRepository.findById(id);
      if (
        restauranteData.email &&
        restauranteData.email !== dadosRestaurante.email
      ) {
        // Caso o email tenha sido alterado, validamos
        const emailExistente = await RestauranteRepository.findByEmail(
          restauranteData.email
        );
        if (emailExistente && emailExistente.id !== id) {
          throw new Error("Email já cadastrado. Tente outro email.");
        }
      }

      if (restauranteData.senha.length < 4) {
        throw new Error("A senha deve ter no mínimo 4 caracteres.");
      }
      const restaurante = await RestauranteRepository.update(
        id,
        restauranteData
      );
      if (!restaurante) {
        throw new Error(
          "Dados do Restaurante não foi alterado não foi possível atualizar."
        );
      }
      return restaurante;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new Error(
          "Erro de validação ao atualizar restaurante: " + error.message
        );
      }
      throw new Error("Erro ao atualizar restaurante: " + error.message);
    }
  }

  async deleteRestaurante(id) {
    try {
      const deletedCount = await RestauranteRepository.delete(id);
      if (deletedCount === 0) {
        throw new Error("Restaurante não encontrado.");
      }
      return { message: "Restaurante deletado com sucesso." };
    } catch (error) {
      throw new Error("Erro ao deletar restaurante: " + error.message);
    }
  }
}

export default new RestauranteService();
