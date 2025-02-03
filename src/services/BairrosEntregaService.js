import BairrosEntregaRepository from "../repositories/BairrosEntregaRepository.js";
import { gerarMenssagemError, validarCampos } from "../utils/ErrorUtil.js";

class BairrosEntregaService {
  async getAllBairrosEntrega(restaurante_id) {
    try {
      const bairros = await BairrosEntregaRepository.findAllBairrosEntrega(
        restaurante_id
      );

      if (!bairros) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return bairros;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async getBairroEntregaById(id, restaurante_id) {
    try {
      const bairro = await BairrosEntregaRepository.findByIdBairroEntrega(
        id,
        restaurante_id
      );

      if (!bairro) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return bairro;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async createBairroEntrega(restaurante_id, dadosBairroEntrega) {
    try {
      if (!dadosBairroEntrega || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_DATA"));
      }

      validarCampos(dadosBairroEntrega, ["nome", "taxa"]);
      dadosBairroEntrega.taxa = parseFloat(dadosBairroEntrega.taxa);
      const bairro = await BairrosEntregaRepository.createBairroEntrega(
        restaurante_id,
        dadosBairroEntrega
      );
      return bairro;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async updateBairroEntrega(id, restaurante_id, dadosBairroEntrega) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const bairroExistente =
        await BairrosEntregaRepository.findByIdBairroEntrega(
          id,
          restaurante_id
        );
      if (!bairroExistente) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      const bairro = await BairrosEntregaRepository.updateBairroEntrega(
        id,
        restaurante_id,
        dadosBairroEntrega
      );

      if (!bairro) {
        throw new Error(gerarMenssagemError("UPDATE_FAILED"));
      }

      validarCampos(dadosBairroEntrega, ["nome", "taxa"]);

      return bairro;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }

  async deleteBairroEntrega(id, restaurante_id) {
    try {
      if (!id || isNaN(id) || !restaurante_id || isNaN(restaurante_id)) {
        throw new Error(gerarMenssagemError("INVALID_ID"));
      }

      const bairro = await BairrosEntregaRepository.deleteBairroEntrega(
        id,
        restaurante_id
      );

      if (!bairro) {
        throw new Error(gerarMenssagemError("NOT_FOUND"));
      }

      return bairro;
    } catch (error) {
      throw new Error(gerarMenssagemError("DEFAULT", error.message));
    }
  }
}

export default new BairrosEntregaService();
