import OutrasConfig from "../models/OutrasConfigModel.js";

class OutrasConfigRepository {
  async getOutrasConfig(restaurante_id) {
    return await OutrasConfig.findOne({
      where: {
        restaurante_id: restaurante_id,
      },
    });
  }
}

export default new OutrasConfigRepository();
