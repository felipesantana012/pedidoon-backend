import Categoria from "../models/CategoriaModel.js";

class CategoriaRepository {
  async findAllCategorias() {
    return await Categoria.findAll();
  }

  async findByIdCategoria(id) {
    return await Categoria.findByPk(id);
  }
}

export default new CategoriaRepository();
