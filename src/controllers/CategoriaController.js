import CategoriaService from "../services/CategoriaService.js";
import { statusError } from "../utils/ErrorUtil.js";

class CategoriaController {
  async getAllCategorias(req, res) {
    try {
      const categorias = await CategoriaService.getAllCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getByIdCategoria(req, res) {
    const { id } = req.params;
    try {
      const categoria = await CategoriaService.getByIdCategoria(id);
      res.status(200).json(categoria);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createCategoria(req, res) {
    const { restaurante_id } = req.params;
    const categoria = req.body;
    categoria.restaurante_id = restaurante_id;

    try {
      const novaCategoria = await CategoriaService.createCategoria(categoria);
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new CategoriaController();
