const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_URL,
    logging: false,
  }
);

// ----- IMPORTANT -----
// If force = true, everytime the server runs we will lose the data for the table
// force = true recreates a table4

sequelize.sync({ alter: false, force: false });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("database connect successfully");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
