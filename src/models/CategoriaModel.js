import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import Itens from "./ItensModel.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    restaurante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurante",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categoria",
    timestamps: false,
  }
);

Categoria.hasMany(Itens, { foreignKey: "categoria_id", as: "itens" });

export default Categoria;
