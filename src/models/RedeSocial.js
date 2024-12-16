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
      defaultValue: "https://www.facebook.com",
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tiktok: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://www.tiktok.com",
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://www.instagram.com",
    },
  },
  {
    tableName: "rede_sociais",
    timestamps: false,
  }
);

export default RedeSocial;
