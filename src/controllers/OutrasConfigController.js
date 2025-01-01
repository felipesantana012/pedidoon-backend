import OutrasConfigService from "../services/OutrasConfigService.js";
import { statusError } from "../utils/ErrorUtil.js";

class OutrasConfigController {
  async getOutrasConfig(req, res) {
    try {
      const restaurante_id = req.restaurante_id;
      const config = await OutrasConfigService.getOutrasConfig(restaurante_id);
      res.status(200).json(config);
    } catch (error) {
      res.status(statusError(error)).json({ message: error.message });
    }
  }
}

export default new OutrasConfigController();
