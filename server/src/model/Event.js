const { Sequelize } = require("sequelize");
const sequelize = require("../database/config");

const Event = sequelize.define("event", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  discount: {
    type: Sequelize.DECIMAL,
  },
  startAt: {
    type: Sequelize.DATE,
  },
  endAt: {
    type: Sequelize.DATE,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Event;
