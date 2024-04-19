const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("rms_anakin", "root", "Noida@2020", {
  host: "localhost",
  dialect: "mysql",
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { dbConnect, sequelize };
