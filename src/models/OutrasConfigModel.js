import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import { v4 as uuidv4 } from "uuid";

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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
      validate: {
        is: {
          args: /^[a-zA-Z0-9_-]+$/,
          msg: "A URL só pode conter letras, números, (_) e (-).",
        },
      },
    },
  },
  {
    tableName: "outras_config",
    timestamps: false,
  }
);

export default OutrasConfig;
