import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize.js";

const OutrasConfig = sequelize.define(
  "OutrasConfig",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
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
  },
  {
    tableName: "outras_config",
    timestamps: false,
  }
);

export default OutrasConfig;
