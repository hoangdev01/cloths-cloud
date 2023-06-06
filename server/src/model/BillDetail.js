const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const BillDetail = sequelize.define("billDetail", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = BillDetail;
