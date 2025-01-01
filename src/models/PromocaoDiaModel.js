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
      allowNull: true,
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

export default PromocaoDia;
