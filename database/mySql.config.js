import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Tienda_Virtual", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
  
export const conectarMySql2 = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    console.log("Base de Datos MySql activada");
  } catch (error) {
    console.log(err);
    throw new Error("No se pudo conectar con mySql");
  }
};
