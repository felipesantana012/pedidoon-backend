import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const OutrasConfig = sequelize.define(
  "OutrasConfig",
  {
    restaurante_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Restaurante",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    img_logo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sua-imagem-logo.png",
    },
    nome_restaurante: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Nome-do-restaurante",
    },
    nome_proprietario: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Nome-do-Proprietario",
    },
  },
  {
    tableName: "outras_config",
    timestamps: false,
  }
);

export default OutrasConfig;
