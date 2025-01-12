const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "This is the primary key for categories table",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "This is the foreign key from users table",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "This is the name of the category",
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
      comment: "This is the type of the category, either income or expense",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "This is the date when the category is created",
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

categories.associate = (models) => {
  categories.belongsTo(models.users, {
    foreignKey: "user_id",
    as: "users",
  });
};
module.exports = categories;
