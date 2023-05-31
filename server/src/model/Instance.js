const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Instance = sequelize.define(
  "instance",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Instance;
