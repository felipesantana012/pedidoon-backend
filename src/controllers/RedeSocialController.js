import RedeSocialService from "../services/RedeSocialService.js";
import { statusError } from "../utils/ErrorUtil.js";

class RedeSocialController {
  async getRedeSocial(req, res) {
    const restaurante_id = req.restaurante_id;
    try {
      const redeSocial = await RedeSocialService.getRedeSocial(restaurante_id);
      res.status(200).json(redeSocial);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateRedeSocial(req, res) {
    const restaurante_id = req.restaurante_id;
    const redesocial = req.body;
    try {
      const redeSocial = await RedeSocialService.updateRedeSocial(
        restaurante_id,
        redesocial
      );
      res.status(200).json(redeSocial);
    } catch (error) {
      res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new RedeSocialController();
