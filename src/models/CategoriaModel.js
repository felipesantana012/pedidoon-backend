import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

export default Categoria;
