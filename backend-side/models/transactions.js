const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Budgets  = sequelize.define(
  "Budgets ",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "Primary key for the budgets table",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the user",
    },
    account_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Foreign key referencing the account",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the category",
    },
    subcategory_id: {
      type: DataTypes.ENUM('Income', 'Expense'),
      allowNull: false,
      comment: "Foreign key referencing the subcategory",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The amount of the budget",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "The description of the budget",
    },
    date_transaction: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "The date of the transaction",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "The timestamp when the account was created",
    },
  },
  {
    tableName: "budgets ",
    timestamps: false,
  }
);

module.exports = Budgets;
