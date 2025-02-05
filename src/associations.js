import BairrosEntrega from "./models/BairrosEntregaModel.js";
import Categoria from "./models/CategoriaModel.js";
import Endereco from "./models/EnderecoModel.js";
import Itens from "./models/ItensModel.js";
import OutrasConfig from "./models/OutrasConfigModel.js";
import Pagamento from "./models/PagamentoModel.js";
import PromocaoDia from "./models/PromocaoDiaModel.js";
import RedeSocial from "./models/RedeSocial.js";
import Restaurante from "./models/RestauranteModel.js";

const defineAssociations = () => {
  // Restaurante e OutrasConfig
  Restaurante.hasOne(OutrasConfig, {
    foreignKey: "restaurante_id",
    as: "outras_config",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  OutrasConfig.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  // Restaurante e Endereco
  Restaurante.hasOne(Endereco, {
    foreignKey: "restaurante_id",
    as: "endereco",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Endereco.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  // Restaurante e RedeSocial
  Restaurante.hasOne(RedeSocial, {
    foreignKey: "restaurante_id",
    as: "rede_sociais",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  RedeSocial.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  //Restaurante e Pagamento
  Restaurante.hasMany(Pagamento, {
    foreignKey: "restaurante_id",
    as: "pagamentos",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Pagamento.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  // Restaurante e Categoria
  Restaurante.hasMany(Categoria, {
    foreignKey: "restaurante_id",
    as: "categorias",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Categoria.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  // Restaurante e Bairros
  Restaurante.hasMany(BairrosEntrega, {
    foreignKey: "restaurante_id",
    as: "bairros_entrega",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  BairrosEntrega.belongsTo(Restaurante, { foreignKey: "restaurante_id" });

  // Categoria e Itens
  Categoria.hasMany(Itens, {
    foreignKey: "categoria_id",
    as: "itens",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Itens.belongsTo(Categoria, { foreignKey: "categoria_id" });

  // Itens e PromocaoDia
  PromocaoDia.belongsTo(Itens, {
    foreignKey: "item_id",
    as: "itens",
  });

  Restaurante.afterCreate(async (restaurante) => {
    try {
      await Promise.all([
        OutrasConfig.create({ restaurante_id: restaurante.id }),
        Endereco.create({ restaurante_id: restaurante.id }),
        RedeSocial.create({ restaurante_id: restaurante.id }),
      ]);
    } catch (error) {
      console.error("Erro ao criar registros relacionados:", error);
    }
  });
};

export default defineAssociations;
