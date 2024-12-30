import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const Endereco = sequelize.define(
  "Endereco",
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
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sua-rua",
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "seu-bairro",
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sua-cidade",
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
    img_restaurante: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sua-imagem-restaurante.png",
    },
  },
  {
    tableName: "endereco",
    timestamps: false,
  }
);

export default Endereco;
