import RestauranteModel from "../models/RestauranteModel.js";

class RestauranteRepository {
  async findAll() {
    return await RestauranteModel.findAll();
  }

  async findByEmail(email) {
    return await RestauranteModel.findOne({ where: { email } });
  }

  async findById(id) {
    return await RestauranteModel.findByPk(id);
  }

  async create(restaurante) {
    return await RestauranteModel.create(restaurante);
  }

  async update(id, restaurante) {
    const [updated] = await RestauranteModel.update(restaurante, {
      where: { id },
    });
    if (updated) {
      return await RestauranteModel.findByPk(id);
    }
    return null;
  }

  async delete(id) {
    const deleted = await RestauranteModel.destroy({
      where: { id },
    });
    return deleted;
  }
}

export default new RestauranteRepository();
