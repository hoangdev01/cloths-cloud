const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const ServiceEvents = sequelize.define("service_event", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});
module.exports = ServiceEvents;
