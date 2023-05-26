const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Bill = sequelize.define(
  "bill",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      unique: true,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    totalPrice: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.ENUM("unpaid", "paid", "cancelled"),
      allowNull: false,
      defaultValue: "unpaid",
    },
    managerId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Bill;
