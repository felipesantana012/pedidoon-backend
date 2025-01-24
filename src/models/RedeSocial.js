import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const RedeSocial = sequelize.define(
  "RedeSocial",
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
    facebook: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome_usuario_no_facebook",
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "5581988888888",
    },
    tiktok: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome_usuario_no_tiktok",
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nome_usuario_no_instagram",
    },
  },
  {
    tableName: "rede_sociais",
    timestamps: false,
  }
);

export default RedeSocial;
