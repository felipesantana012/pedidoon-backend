import Categoria from "../models/CategoriaModel.js";
import Endereco from "../models/EnderecoModel.js";
import OutrasConfig from "../models/OutrasConfigModel.js";
import RedeSocial from "../models/RedeSocial.js";
import RestauranteModel from "../models/RestauranteModel.js";

class RestauranteRepository {
  async findAll() {
    return await RestauranteModel.findAll({});
  }

  async findById(id) {
    return await RestauranteModel.findByPk(id, {
      include: [
        {
          model: Endereco,
          as: "endereco",
        },
        {
          model: RedeSocial,
          as: "rede_sociais",
        },
        {
          model: Categoria,
          as: "categorias",
        },
        { model: OutrasConfig, as: "outras_config" },
      ],
    });
  }

  async findByEmail(email) {
    return await RestauranteModel.findOne({ where: { email } });
  }

  async create(restaurante) {
    const novoRestaurante = await RestauranteModel.create(restaurante, {
      include: [
        {
          model: Endereco,
          as: "endereco",
        },
        {
          model: RedeSocial,
          as: "rede_sociais",
        },
        {
          model: Categoria,
          as: "categorias",
        },
        { model: OutrasConfig, as: "outras_config" },
      ],
    });

    return await RestauranteModel.findByPk(novoRestaurante.id, {
      include: [
        {
          model: Endereco,
          as: "endereco",
        },
        {
          model: RedeSocial,
          as: "rede_sociais",
        },
        {
          model: Categoria,
          as: "categorias",
        },
        { model: OutrasConfig, as: "outras_config" },
      ],
    });
  }

  async delete(id) {
    const deleted = await RestauranteModel.destroy({
      where: { id },
    });
    return deleted;
  }

  async getRestauranteEmail(id) {
    return await RestauranteModel.findByPk(id, {
      attributes: ["email"],
    });
  }

  async updateRestauranteLogin(id, login) {
    if (login) {
      const [updated] = await RestauranteModel.update(login, {
        where: { id },
      });

      if (updated > 0) {
        const restuarante = await RestauranteModel.findByPk(id);
        const loginAtualizado = {
          id: restuarante.id,
          email: restuarante.email,
          senha: restuarante.senha,
        };
        return loginAtualizado;
      }
    }

    return null;
  }
}

export default new RestauranteRepository();
