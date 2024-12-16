import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";
import Endereco from "./EnderecoModel.js";
import RedeSocial from "./RedeSocial.js";

const Restaurante = sequelize.define(
  "Restaurante",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 100],
      },
    },
    nomeRestaurante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeProprietario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "restaurante",
    timestamps: false,
  }
);

Restaurante.hasOne(Endereco, { foreignKey: "restaurante_id", as: "endereco" });
Restaurante.hasOne(RedeSocial, {
  foreignKey: "restaurante_id",
  as: "rede_sociais",
});

export default Restaurante;
