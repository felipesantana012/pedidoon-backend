import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Endereco = sequelize.define(
  "Endereco",
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
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkmaps: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://www.google.com/maps",
    },
  },
  {
    tableName: "endereco",
    timestamps: false,
  }
);

export default Endereco;
