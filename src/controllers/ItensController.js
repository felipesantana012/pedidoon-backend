import ImagemService from "../services/ImagemService.js";
import ItensService from "../services/ItensService.js";
import { statusError } from "../utils/ErrorUtil.js";

class ItensController {
  async getAllItens(req, res) {
    try {
      const { categoria_id } = req.params;
      const restaurante_id = req.restaurante_id;

      const itens = await ItensService.getAllItens(
        categoria_id,
        restaurante_id
      );
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getAllItensDisponiveis(req, res) {
    try {
      const itens = await ItensService.getAllItensDisponiveis(
        req.params.categoria_id,
        req.restaurante_id
      );
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getAllItensAllRestaurante(req, res) {
    try {
      const itens = await ItensService.getAllItensAllRestaurante(
        req.restaurante_id
      );
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async getByIdItem(req, res) {
    try {
      const item = await ItensService.getByIdItem(
        req.params.id,
        req.params.categoria_id,
        req.restaurante_id
      );
      return res.status(200).json(item);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async createItem(req, res) {
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }

    const { file } = req;
    let imageUrl = null;

    if (file) {
      imageUrl = ImagemService.gerarCaminhoImagem(
        req.restaurante_id,
        file.filename
      );
    }
    const itemData = {
      ...req.body,
      img: imageUrl,
    };

    try {
      const item = await ItensService.createItem(
        req.params.categoria_id,
        req.restaurante_id,
        itemData
      );
      return res.status(201).json(item);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }
      const { file } = req;
      const { id, categoria_id } = req.params;
      const { restaurante_id } = req;
      let imageUrl = req.body.img;

      if (file) {
        const item = await ItensService.getByIdItem(
          id,
          categoria_id,
          restaurante_id
        );
        if (item && item.img) {
          await ImagemService.removerImagem(item.img);
        }

        imageUrl = ImagemService.gerarCaminhoImagem(
          restaurante_id,
          file.filename
        );
      }

      const updatedItemData = {
        ...req.body,
        img: imageUrl,
      };

      const item = await ItensService.updateItem(
        req.params.id,
        req.params.categoria_id,
        req.restaurante_id,
        updatedItemData
      );
      return res.status(200).json(item);
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }

  async deleteItem(req, res) {
    try {
      const { id, categoria_id } = req.params;
      const { restaurante_id } = req;

      const item = await ItensService.getByIdItem(
        id,
        categoria_id,
        restaurante_id
      );

      if (item && item.img) {
        await ImagemService.removerImagem(item.img);
      }

      await ItensService.deleteItem(id, categoria_id, restaurante_id);

      return res.status(204).end();
    } catch (error) {
      return res.status(statusError(error)).json({ error: error.message });
    }
  }
}

export default new ItensController();
