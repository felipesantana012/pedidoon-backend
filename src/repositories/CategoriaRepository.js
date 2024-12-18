import Categoria from "../models/CategoriaModel.js";

class CategoriaRepository {
  async findAllCategorias() {
    return await Categoria.findAll();
  }

  async findByIdCategoria(id) {
    return await Categoria.findByPk(id);
  }

  async createCategoria(categoria) {
    return await Categoria.create(categoria);
  }
}

export default new CategoriaRepository();
