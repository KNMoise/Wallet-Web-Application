const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Budgets = sequelize.define("Budgets", {
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the category",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      comment: "The amount of the budget",
    },
    period:{
        type: DataTypes.ENUM("daily", "weekly", "monthly", "yearly"),
        allowNull: false,
        comment: "The period of the budget",
    },
    date_start:{
        type: DataTypes.DATE,
        allowNull: false,
        comment: "The date when the budget starts",
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false,
        comment: "The date when the budget ends",
    },
    currency: {
      type: DataTypes.ENUM("RWF", "USD", "EUR"),
      allowNull: false,
      defaultValue: "RWF",
      comment: "The currency of the budget",
    },
    current_spendings: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      comment: "The current spendings of the budget",
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
