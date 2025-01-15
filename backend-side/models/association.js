const users = require("./users");
const Accounts = require("./accounts");
const categories = require("./category");
const Subcategories = require("./subcategories");
const Budgets = require("./budgets");
const Transactions = require("./transactions");
const Notifications = require("./notifications");
const Blacklist = require("./blacklist");

const setupAssociations = () => {
  // Define relationships
  users.hasMany(Accounts, { foreignKey: "user_id", onDelete: "CASCADE" });
  users.hasMany(categories, { foreignKey: "user_id", onDelete: "CASCADE" });
  users.hasMany(Budgets, { foreignKey: "user_id", onDelete: "CASCADE" });
  users.hasMany(Notifications, { foreignKey: "user_id", onDelete: "CASCADE" });
  users.hasMany(Blacklist, { foreignKey: "user_id", onDelete: "CASCADE" });

  Accounts.belongsTo(users, { foreignKey: "user_id" });
  Accounts.hasMany(Transactions, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });

  categories.belongsTo(users, { foreignKey: "user_id" });
  categories.hasMany(Subcategories, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });
  categories.hasMany(Budgets, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });
  categories.hasMany(Transactions, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });

  Subcategories.belongsTo(categories, { foreignKey: "category_id" });
  Subcategories.hasMany(Transactions, {
    foreignKey: "subcategory_id",
    onDelete: "SET NULL",
  });

  Transactions.belongsTo(Accounts, { foreignKey: "account_id" });
  Transactions.belongsTo(categories, { foreignKey: "category_id" });
  Transactions.belongsTo(Subcategories, { foreignKey: "subcategory_id" });
};

module.exports = setupAssociations;
