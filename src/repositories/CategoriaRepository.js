import Categoria from "../models/CategoriaModel.js";
import Itens from "../models/ItensModel.js";
class CategoriaRepository {
  async findAllCategorias(restaurante_id) {
    return await Categoria.findAll({
      where: { restaurante_id },
      include: [
        {
          model: Itens,
          as: "itens",
        },
      ],
    });
  }

  async findAllCategoriasItensDisponiveis(restaurante_id) {
    return await Categoria.findAll({
      where: { restaurante_id },
      include: [
        {
          model: Itens,
          as: "itens",
          where: {
            disponivel: true,
          },
        },
      ],
    });
  }

  async findByIdCategoria(id, restaurante_id) {
    return await Categoria.findOne({
      where: {
        id,
        restaurante_id,
      },
      include: [
        {
          model: Itens,
          as: "itens",
        },
      ],
    });
  }

  async createCategoria(restaurante_id, dadosCategoria) {
    return await Categoria.create({
      ...dadosCategoria,
      restaurante_id,
    });
  }

  async updateCategoria(id, restaurante_id, dadosAtualizacao) {
    if (dadosAtualizacao) {
      const [linhasAfetadas] = await Categoria.update(dadosAtualizacao, {
        where: {
          id,
          restaurante_id,
        },
      });

      if (linhasAfetadas > 0) {
        return await this.findByIdCategoria(id, restaurante_id);
      }
    }

    return null;
  }

  async deleteCategoria(id, restaurante_id) {
    return await Categoria.destroy({
      where: {
        id,
        restaurante_id,
      },
    });
  }
}

export default new CategoriaRepository();
