import OutrasConfig from "../models/OutrasConfigModel.js";

class OutrasConfigRepository {
  async getOutrasConfig(restaurante_id) {
    return await OutrasConfig.findOne({
      where: {
        restaurante_id: restaurante_id,
      },
    });
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
