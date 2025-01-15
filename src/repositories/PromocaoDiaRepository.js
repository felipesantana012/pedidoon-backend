import Itens from "../models/ItensModel.js";
import PromocaoDia from "../models/PromocaoDiaModel.js";

class PromocaoDiaRepository {
  async findPromocaoDia(restaurante_id) {
    return await PromocaoDia.findOne({
      where: { restaurante_id },
      include: {
        model: Itens,
        as: "itens",
        required: false,
      },
    });
  }

  async setPromocaoDia(restaurante_id, item_id) {
    await PromocaoDia.destroy({
      where: { restaurante_id },
    });
    return await PromocaoDia.create({
      restaurante_id,
      item_id,
    });
  }

  async removePromocaoDia(restaurante_id) {
    return await PromocaoDia.destroy({
      where: { restaurante_id },
    });
  }
}

export default new PromocaoDiaRepository();
