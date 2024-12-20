import Itens from "../models/ItensModel.js";

class ItensRepository {
  async findAllItens(categoria_id) {
    return await Itens.findAll({
      where: { categoria_id },
    });
  }

  async findAllItensDisponiveis(categoria_id) {
    return await Itens.findAll({
      where: { categoria_id, disponivel: true },
    });
  }

  async findByIdItem(id, categoria_id) {
    return await Itens.findOne({
      where: {
        id,
        categoria_id,
      },
    });
  }

  async createItem(categoria_id, dadosItem) {
    return await Itens.create({
      ...dadosItem,
      categoria_id,
    });
  }

  async updateItem(id, categoria_id, dadosItem) {
    if (dadosItem) {
      const [linhasAfetadas] = await Itens.update(dadosItem, {
        where: {
          id,
          categoria_id,
        },
      });

      if (linhasAfetadas > 0) {
        return await this.findByIdItem(id, categoria_id);
      }
    }
    return null;
  }

  async deleteItem(id, categoria_id) {
    return await Itens.destroy({
      where: {
        id,
        categoria_id,
      },
    });
  }
}

export default new ItensRepository();
