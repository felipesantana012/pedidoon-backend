import CategoriaRepository from "../repositories/CategoriaRepository.js";
import { gerarMenssagemError } from "../utils/ErrorUtil.js";

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
}

export default new CategoriaService();
