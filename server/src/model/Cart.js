const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNULL: false,
      primaryKey: true,
    },
    slug: {
      type: Sequelize.STRING,
      unique: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNULL: false,
      defaultValue: 0,
    },
    numberOfPeople: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    numberOfChild: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
module.exports = Cart;
