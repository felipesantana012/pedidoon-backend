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
    return await RestauranteModel.create(restaurante, {
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
      const [updatedRows] = await Endereco.update(endereco, {
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

  async update(id, restaurante) {
    const { endereco, ...restauranteData } = restaurante;

    // Atualiza os dados do Restaurante
    const [updated] = await RestauranteModel.update(restauranteData, {
      where: { id },
    });

    if (!updated) {
      return null; // Retorna null se o restaurante não foi encontrado
    }

    // Atualiza os dados do Endereco (se foi passado no request)
    if (endereco) {
      await Endereco.update(endereco, {
        where: { restaurante_id: id },
      });
    }

    // Retorna os dados atualizados do Restaurante, incluindo o endereço
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
