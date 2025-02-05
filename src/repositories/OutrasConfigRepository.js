import OutrasConfig from "../models/OutrasConfigModel.js";

class OutrasConfigRepository {
  async getOutrasConfig(restaurante_id) {
    return await OutrasConfig.findOne({
      where: {
        restaurante_id: restaurante_id,
      },
    });
  }

  async findByUrl(url) {
    return await OutrasConfig.findOne({
      where: {
        url: url,
      },
    });
  }

  async getRestauranteIdByUrl(url) {
    const outrasConfig = await OutrasConfig.findOne({
      where: { url: url },
      attributes: ["restaurante_id"],
    });

    return outrasConfig ? outrasConfig.restaurante_id : null;
  }

  async updateOutrasConfig(restaurante_id, outrasConfig) {
    if (outrasConfig) {
      const [updated] = await OutrasConfig.update(outrasConfig, {
        where: {
          restaurante_id: restaurante_id,
        },
      });

      if (updated > 0) {
        return await OutrasConfig.findOne({
          where: {
            restaurante_id: restaurante_id,
          },
        });
      }
    }

    return null;
  }
}

export default new OutrasConfigRepository();
