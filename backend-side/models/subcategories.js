const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Subcategories = sequelize.define(
  "subcategories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "This is the primary key for Subcategories table",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "This is the foreign key from category table",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the name of the Subcategories",
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "This is the description of the Subcategories",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "This is the date when the subcategories is created",
    },
  },
  {
    tableName: "subcategories",
    timestamps: false,
  }
);


module.exports = Subcategories;
