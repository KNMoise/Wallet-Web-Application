const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Transactions = sequelize.define(
  "Transactions",
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
      references: {
        model: 'users', // Ensure `users` table exists
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      comment: "Foreign key referencing the user",
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts', // Ensure `accounts` table exists
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      comment: "Foreign key referencing the account",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories', // Ensure `categories` table exists
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      comment: "Foreign key referencing the category",
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'subcategories', // Ensure `subcategories` table exists
          key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      comment: "Subcategory of the transaction",
  },
    type: {
      type: DataTypes.ENUM('Income', 'Expense'),
      allowNull: false,
      comment: "Type of transaction",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      comment: "The amount of the transaction",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "The description of the transaction",
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
    tableName: 'transaction',
    timestamps: true, // Sequelize handles `createdAt` and `updatedAt`
    createdAt: 'created_at',
    updatedAt: false,
  }
);

module.exports = Transactions;
