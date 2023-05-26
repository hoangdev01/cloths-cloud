const Sequelize = require("sequelize");
const sequelize = require("../database/config");
const RoleAccounts = sequelize.define("role_account", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});
module.exports = RoleAccounts;
