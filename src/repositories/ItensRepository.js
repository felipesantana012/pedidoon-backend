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
}

export default new ItensRepository();
