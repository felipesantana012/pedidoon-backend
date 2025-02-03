import BairrosEntrega from "../models/BairrosEntregaModel.js";

class BairrosEntregaRepository {
  async findAllBairrosEntrega(restaurante_id) {
    return await BairrosEntrega.findAll({
      where: { restaurante_id },
    });
  }

  async findByIdBairroEntrega(id, restaurante_id) {
    return await BairrosEntrega.findOne({
      where: {
        id,
        restaurante_id,
      },
    });
  }

  async createBairroEntrega(restaurante_id, dadosBairroEntrega) {
    return await BairrosEntrega.create({
      ...dadosBairroEntrega,
      restaurante_id,
    });
  }

  async updateBairroEntrega(id, restaurante_id, dadosBairroEntrega) {
    if (dadosBairroEntrega) {
      const [linhasAfetadas] = await BairrosEntrega.update(dadosBairroEntrega, {
        where: {
          id,
          restaurante_id,
        },
      });

      if (linhasAfetadas > 0) {
        return await this.findByIdBairroEntrega(id, restaurante_id);
      }
    }
    return null;
  }

  async deleteBairroEntrega(id, restaurante_id) {
    return await BairrosEntrega.destroy({
      where: {
        id,
        restaurante_id,
      },
    });
  }
}

export default new BairrosEntregaRepository();
