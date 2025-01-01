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
      defaultValue: "nome da rua",
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome do bairro",
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome da cidade",
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome do Estado",
    },
    linkmaps: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://www.google.com/maps",
    },
    img_restaurante: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "uma-foto-restaurante.png",
    },
  },
  {
    tableName: "endereco",
    timestamps: false,
  }
);

export default Endereco;
