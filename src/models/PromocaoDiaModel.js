import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import Itens from "./ItensModel.js";

const PromocaoDia = sequelize.define(
  "PromocaoDia",
  {
    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Um restaurante pode ter apenas um item em promoção por vez
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Pode ser null se não houver item em promoção
      references: {
        model: "Itens",
        key: "id",
      },
    },
  },
  {
    tableName: "promocao_dia",
    timestamps: false,
  }
);

// Associações
PromocaoDia.belongsTo(Itens, {
  foreignKey: "item_id",
  as: "itens", // Alias para acessar o item relacionado a uma promoção
});

export default PromocaoDia;
