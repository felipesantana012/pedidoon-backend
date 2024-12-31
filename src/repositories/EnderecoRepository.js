import Endereco from "../models/EnderecoModel.js";

class EnderecoRepository {
  async getEndereco(restaurante_id) {
    return await Endereco.findOne({
      where: { restaurante_id: restaurante_id },
    });
  }

  async updateEndereco(restaurante_id, endereco) {
    if (endereco) {
      const [updated] = await Endereco.update(endereco, {
        where: { restaurante_id: restaurante_id },
      });

      if (updated > 0) {
        return await Endereco.findOne({
          where: { restaurante_id: restaurante_id },
        });
      }
    }

    return null;
  }
}

export default new EnderecoRepository();
