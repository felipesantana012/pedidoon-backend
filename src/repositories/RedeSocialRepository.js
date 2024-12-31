import RedeSocial from "../models/RedeSocial.js";

class RedeSocialRepository {
  async getRedeSocial(restaurante_id) {
    return await RedeSocial.findOne({
      where: { restaurante_id: restaurante_id },
    });
  }

  async updateRedeSocial(restaurante_id, redesocial) {
    if (redesocial) {
      const [updated] = await RedeSocial.update(redesocial, {
        where: { restaurante_id: restaurante_id },
      });

      if (updated > 0) {
        return await RedeSocial.findOne({
          where: { restaurante_id: restaurante_id },
        });
      }
    }
  }
}

export default new RedeSocialRepository();
