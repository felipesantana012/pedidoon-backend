import sequelize from "../database/sequelize.js";

const Itens = sequelize.define(
  "Itens",
  {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoria_id: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria",
        key: "id",
      },
      onDelete: "CASCADE",
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
    preco: {
      type: sequelize.Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    disponivel: {
      type: sequelize.Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "itens",
    timestamps: false,
  }
);

export default Itens;
