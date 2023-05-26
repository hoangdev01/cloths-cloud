const Sequelize = require("sequelize");
const sequelize = require("../database/config");

const Image = sequelize.define("image", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_avatar: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Image;
