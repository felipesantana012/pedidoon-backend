import Categoria from "./models/CategoriaModel.js";
import Endereco from "./models/EnderecoModel.js";
import Itens from "./models/ItensModel.js";
import OutrasConfig from "./models/OutrasConfigModel.js";
import PromocaoDia from "./models/PromocaoDiaModel.js";
import RedeSocial from "./models/RedeSocial.js";
import Restaurante from "./models/RestauranteModel.js";

const defineAssociations = () => {
  //Restaurante e OutrasConfig
  Restaurante.hasOne(OutrasConfig, {
    foreignKey: "restaurante_id",
    as: "outras_config",
  });

  OutrasConfig.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
  });

  Restaurante.afterCreate(async (restaurante, options) => {
    await OutrasConfig.create({ restaurante_id: restaurante.id });
  });

  // Restaurante e Endereco
  Restaurante.hasOne(Endereco, {
    foreignKey: "restaurante_id",
    as: "endereco",
    onDelete: "CASCADE",
  });

  Endereco.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
  });

  Restaurante.afterCreate(async (restaurante, options) => {
    await Endereco.create({ restaurante_id: restaurante.id });
  });

  // Restaurante e RedesSociais
  Restaurante.hasOne(RedeSocial, {
    foreignKey: "restaurante_id",
    as: "rede_sociais",
    onDelete: "CASCADE",
  });

  RedeSocial.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
  });

  Restaurante.afterCreate(async (restaurante, options) => {
    await RedeSocial.create({ restaurante_id: restaurante.id });
  });

  // Restaurante e Categoria
  Restaurante.hasMany(Categoria, {
    foreignKey: "restaurante_id",
    as: "categorias",
  });

  Categoria.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
  });

  // Restaurante e Itens
  Restaurante.hasMany(Itens, {
    foreignKey: "restaurante_id",
    as: "itens",
  });

  Itens.belongsTo(Restaurante, {
    foreignKey: "restaurante_id",
  });

  // Itens e PromocaoDia
  PromocaoDia.belongsTo(Itens, {
    foreignKey: "item_id",
    as: "itens", // Alias para acessar o item relacionado a uma promoção
  });
};

export default defineAssociations;
