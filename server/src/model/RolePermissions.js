const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const RolePermissions = sequelize.define("role_permission", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});
module.exports = RolePermissions;
