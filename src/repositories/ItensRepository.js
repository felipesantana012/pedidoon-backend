import Itens from "../models/ItensModel";

class ItensRepository {
  async findAll() {
    return await Itens.findAll();
  }
}

export default new ItensRepository();
