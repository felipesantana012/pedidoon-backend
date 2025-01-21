import CategoriaRepository from "../repositories/CategoriaRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class CategoriaService {
  async getAllCategorias(restaurante_id) {
    try {
      await RestauranteService.getRestauranteById(restaurante_id);
      const categorias = await CategoriaRepository.findAllCategorias(
        restaurante_id
      );
      return categorias;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getAllCategoriasItensDisponiveis(restaurante_id) {
    try {
      await RestauranteService.getRestauranteById(restaurante_id);
      const categorias =
        await CategoriaRepository.findAllCategoriasItensDisponiveis(
          restaurante_id
        );
      return categorias;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getByIdCategoria(id, restaurante_id) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const categoria = await CategoriaRepository.findByIdCategoria(
        id,
        restaurante_id
      );

      if (!categoria) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return categoria;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createCategoria(restaurante_id, dadosCategoria) {
    try {
      if (!restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      validarCampos(dadosCategoria, ["nome"]);

      const novaCategoria = await CategoriaRepository.createCategoria(
        restaurante_id,
        dadosCategoria
      );
      return novaCategoria;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateCategoria(id, restaurante_id, dadosAtualizacao) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const categoriaExistente = await CategoriaRepository.findByIdCategoria(
        id,
        restaurante_id
      );

      if (!categoriaExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      validarCampos(dadosAtualizacao, ["nome"]);

      const categoriaAtualizada = await CategoriaRepository.updateCategoria(
        id,
        restaurante_id,
        dadosAtualizacao
      );

      if (!categoriaAtualizada) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      return categoriaAtualizada;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async deleteCategoria(id, restaurante_id) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      await RestauranteService.getRestauranteById(restaurante_id);

      const categoriaExistente = await CategoriaRepository.findByIdCategoria(
        id,
        restaurante_id
      );

      if (categoriaExistente.itens.length > 0) {
        throw new Error(gerarMenssagemError("CATEGORIA_HAS_ITEM"));
      }

      if (!categoriaExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return await CategoriaRepository.deleteCategoria(id, restaurante_id);
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new CategoriaService();
