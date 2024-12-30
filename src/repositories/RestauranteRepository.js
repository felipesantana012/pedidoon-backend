import Categoria from "../models/CategoriaModel.js";
import Endereco from "../models/EnderecoModel.js";
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
      ],
    });
  }

  async delete(id) {
    const deleted = await RestauranteModel.destroy({
      where: { id },
    });
    return deleted;
  }

  async updateRestauranteEndereco(id, endereco) {
    if (endereco) {
      const [updated] = await Endereco.update(endereco, {
        where: { restaurante_id: id },
      });

      if (updated > 0) {
        return await Endereco.findOne({
          where: { restaurante_id: id },
        });
      }
    }

    return null;
  }

  async updateRestauranteRedeSocial(id, redeSocial) {
    if (redeSocial) {
      const [updated] = await RedeSocial.update(redeSocial, {
        where: { restaurante_id: id },
      });

      if (updated > 0) {
        return await RedeSocial.findOne({
          where: { restaurante_id: id },
        });
      }
    }

    return null;
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
