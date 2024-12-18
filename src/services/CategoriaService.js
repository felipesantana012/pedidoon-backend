import CategoriaRepository from "../repositories/CategoriaRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";
import RestauranteService from "./RestauranteService.js";

class CategoriaService {
  async getAllCategorias() {
    try {
      return await CategoriaRepository.findAllCategorias();
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getByIdCategoria(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }
      const categoria = await CategoriaRepository.findByIdCategoria(id);
      if (!categoria) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }
      return categoria;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createCategoria(categoria) {
    try {
      if (!categoria) {
        throw new Error(gerarMenssagemError("REQUEST_BODY_INVALID"));
      }
      const restaurante = await RestauranteService.getRestauranteById(
        categoria.restaurante_id
      );

      if (!restaurante) {
        return res.status(404).json({ error: "Restaurante não encontrado." });
      }

      validarCampos(categoria, ["nome"]);
      return await CategoriaRepository.createCategoria(categoria);
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new CategoriaService();
