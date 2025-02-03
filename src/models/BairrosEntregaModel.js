import sequelize from "../database/sequelize.js";

const BairrosEntrega = sequelize.define(
  "BairrosEntrega",
  {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurante_id: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurante",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nome: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    taxa: {
      type: sequelize.Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "bairros_entrega",
    timestamps: false,
  }
);

export default BairrosEntrega;
