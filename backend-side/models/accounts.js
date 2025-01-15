const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../db/connection");

const Accounts = sequelize.define(
  "Accounts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "Primary key for the Account table",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the user",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "The name of the account",
    },
    type: {
      type: DataTypes.ENUM("bank", "mobile_money", "cash", "other"),
      allowNull: false,
      comment: "The type of the account",
    },
    balance: {
      type: DataTypes.DECIMAL(30, 2),
      allowNull: false,
      defaultValue: 0.0,
      comment: "The balance of the account",
    },
    currency: {
      type: DataTypes.ENUM("RWF", "USD", "EUR"),
      allowNull: false,
      defaultValue: "RWF",
      comment: "The currency of the account",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "The timestamp when the account was created",
    },
  },
  {
    tableName: "accounts",
    timestamps: false,
  }
);

module.exports = Accounts;
