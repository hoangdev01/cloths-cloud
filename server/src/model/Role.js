const Sequelize = require('sequelize');
const sequelize = require('../database/config');

const Role = sequelize.define(
  'role',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: 'user',
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Role;
