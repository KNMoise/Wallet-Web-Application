const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const MoneyIn = sequelize.define(
  "MoneyIn",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    in_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the category",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "The description of the income generated where it has come from",
    },
  },
  {
    tableName: "money_in",
    timestamps: true,
  }
);

module.exports = MoneyIn;
