const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.PS_NAME,
  process.env.PS_USER,
  process.env.PS_PASSWORD,
  {
    host: process.env.PS_HOST,
    port: process.env.PS_PORT,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 35,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    return sequelize;
  } catch (err) {
    console.error("Database connection error", err);
    throw err;
  }
};

module.exports = { sequelize, connectToDatabase };
