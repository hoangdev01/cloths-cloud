const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Notification = sequelize.define(
  "notification",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    tag: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Notification;
