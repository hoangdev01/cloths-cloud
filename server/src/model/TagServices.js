const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const TagServices = sequelize.define("tag_service", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});
module.exports = TagServices;
