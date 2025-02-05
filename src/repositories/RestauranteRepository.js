import BairrosEntrega from "../models/BairrosEntregaModel.js";
import Categoria from "../models/CategoriaModel.js";
import Endereco from "../models/EnderecoModel.js";
import OutrasConfig from "../models/OutrasConfigModel.js";
import Pagamento from "../models/PagamentoModel.js";
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
        { model: BairrosEntrega, as: "bairros_entrega" },
        { model: Pagamento, as: "pagamentos" },
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
        { model: BairrosEntrega, as: "bairros_entrega" },
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
        { model: BairrosEntrega, as: "bairros_entrega" },
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

  async updateRestauranteEmail(id, email) {
    if (email) {
      const [updated] = await RestauranteModel.update(email, {
        where: { id },
      });

      if (updated > 0) {
        const restuarante = await RestauranteModel.findByPk(id);
        const emailAtualizado = {
          id: restuarante.id,
          email: restuarante.email,
        };
        return emailAtualizado;
      }
    }

    return null;
  }

  async updateRestauranteSenha(id, senha) {
    if (senha) {
      const [updated] = await RestauranteModel.update(senha, {
        where: { id },
      });

      if (updated > 0) {
        const restuarante = await RestauranteModel.findByPk(id);
        const senhaAtualizada = {
          id: restuarante.id,
          senha: restuarante.senha,
        };
        return senhaAtualizada;
      }
    }

    return null;
  }
}

export default new RestauranteRepository();
