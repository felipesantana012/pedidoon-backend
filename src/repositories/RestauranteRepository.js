import Endereco from "../models/EnderecoModel.js";
import RestauranteModel from "../models/RestauranteModel.js";

class RestauranteRepository {
  async findAll() {
    return await RestauranteModel.findAll({
      include: [
        {
          model: Endereco,
          as: "endereco",
          attributes: ["rua", "bairro", "cidade", "estado"],
        },
      ],
    });
  }

  async findByEmail(email) {
    return await RestauranteModel.findOne({ where: { email } });
  }

  async findById(id) {
    return await RestauranteModel.findByPk(id, {
      include: [
        {
          model: Endereco,
          as: "endereco",
          attributes: ["rua", "bairro", "cidade", "estado"],
        },
      ],
    });
  }

  async create(restaurante) {
    const novoRestaurante = await RestauranteModel.create(restaurante, {
      include: [
        {
          model: Endereco,
          as: "endereco",
        },
      ],
    });

    return await RestauranteModel.findByPk(novoRestaurante.id, {
      include: [
        {
          model: Endereco,
          as: "endereco",
        },
      ],
    });
  }

  async updateRestauranteEndereco(id, restaurante) {
    const { endereco } = restaurante;

    if (endereco) {
      await Endereco.update(endereco, {
        where: { restaurante_id: id },
      });
    }

    return await RestauranteModel.findByPk(id, {
      include: [
        {
          model: Endereco,
          as: "endereco",
          attributes: ["rua", "bairro", "cidade", "estado"],
        },
      ],
    });
  }

  async delete(id) {
    const deleted = await RestauranteModel.destroy({
      where: { id },
    });
    return deleted;
  }
}

export default new RestauranteRepository();
