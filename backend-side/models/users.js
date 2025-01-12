const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "This is the primary key for user table",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the name of the user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the email of the user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the password of the user",
    },
    confirm_password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the confirm password of the user",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "This is the date when the user is created",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);


module.exports = users;
