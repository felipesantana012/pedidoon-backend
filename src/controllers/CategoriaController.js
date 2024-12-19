import CategoriaService from "../services/CategoriaService.js";
import { statusError } from "../utils/ErrorUtil.js";

class CategoriaController {
  async getAllCategorias(req, res) {
    const { restaurante_id } = req.params;
    try {
      const categorias = await CategoriaService.getAllCategorias(
        restaurante_id
      );
      res.status(200).json(categorias);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getByIdCategoria(req, res) {
    const { id, restaurante_id } = req.params;
    try {
      const categoria = await CategoriaService.getByIdCategoria(
        id,
        restaurante_id
      );
      res.status(200).json(categoria);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createCategoria(req, res) {
    const { restaurante_id } = req.params;
    const categoria = req.body;

    try {
      const novaCategoria = await CategoriaService.createCategoria(
        restaurante_id,
        categoria
      );

      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateCategoria(req, res) {
    const { restaurante_id, id } = req.params;
    const categoria = req.body;

    try {
      const categoriaAtualizada = await CategoriaService.updateCategoria(
        id,
        restaurante_id,
        categoria
      );

      res.status(200).json(categoriaAtualizada);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async deleteCategoria(req, res) {
    const { restaurante_id, id } = req.params;

    try {
      await CategoriaService.deleteCategoria(id, restaurante_id);
      res.status(204).end();
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new CategoriaController();
