const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('rms_anakin', 'root', 'Noida@2020', {
  host: 'localhost',
  dialect: 'mysql'
});
exports.dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}