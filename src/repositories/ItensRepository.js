import Itens from "../models/ItensModel.js";

class ItensRepository {
  async findAllItens(categoria_id, restaurante_id) {
    return await Itens.findAll({
      where: { categoria_id, restaurante_id },
    });
  }

  async findAllItensDisponiveis(categoria_id, restaurante_id) {
    return await Itens.findAll({
      where: { categoria_id, restaurante_id, disponivel: true },
    });
  }

  async findByIdItem(id, categoria_id, restaurante_id) {
    return await Itens.findOne({
      where: {
        id,
        categoria_id,
        restaurante_id,
      },
    });
  }

  async createItem(categoria_id, restaurante_id, dadosItem) {
    return await Itens.create({
      ...dadosItem,
      categoria_id,
      restaurante_id,
    });
  }

  async updateItem(id, categoria_id, restaurante_id, dadosItem) {
    if (dadosItem) {
      const [linhasAfetadas] = await Itens.update(dadosItem, {
        where: {
          id,
          categoria_id,
          restaurante_id,
        },
      });

      if (linhasAfetadas > 0) {
        return await this.findByIdItem(id, categoria_id, restaurante_id);
      }
    }
    return null;
  }

  async deleteItem(id, categoria_id, restaurante_id) {
    return await Itens.destroy({
      where: {
        id,
        categoria_id,
        restaurante_id,
      },
    });
  }
}

export default new ItensRepository();
