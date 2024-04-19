const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = require("./User");
const Train = require("./Train");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("booked", "cancelled"),
    allowNull: false,
  },
});

User.hasMany(Booking);
Booking.belongsTo(User);

Train.hasMany(Booking);
Booking.belongsTo(Train);

module.exports = Booking;
