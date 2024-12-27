import PromocaoDiaRepository from "../repositories/PromocaoDiaRepository.js";
import { gerarMenssagemError } from "../utils/ErrorUtil.js";
import ItensService from "./ItensService.js";

class PromocaoDiaService {
  async definirPromocaoDia(restaurante_id, item_id) {
    try {
      if (item_id === null) {
        return await PromocaoDiaRepository.removePromocaoDia(restaurante_id);
      }
      const itemExiste = await ItensService.getAllItensAllRestaurante(
        restaurante_id
      );
      const item = itemExiste.find((item) => item.id === item_id);
      if (!item) {
        throw new Error(
          gerarMenssagemError(
            "NOT_FOUND",
            "O item especificado não existe ou não pertence ao restaurante."
          )
        );
      }

      return await PromocaoDiaRepository.setPromocaoDia(
        restaurante_id,
        item_id
      );
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async buscarPromocaoDia(restaurante_id) {
    try {
      const promocao = await PromocaoDiaRepository.findPromocaoDia(
        restaurante_id
      );
      if (!promocao) {
        throw new Error(
          gerarMenssagemError(
            "NOT_FOUND",
            "Nenhuma promoção do dia encontrada."
          )
        );
      }
      return promocao;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new PromocaoDiaService();
