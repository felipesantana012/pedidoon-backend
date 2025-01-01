import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT_MYSQL,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizadooooooo.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
})();

export default sequelize;
