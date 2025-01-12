const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Notifications = sequelize.define(
  "Notifications",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "Primary key for the notifications table",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key referencing the user",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "The notification message for the user",
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: "Whether the notification has been read",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      comment: "The timestamp when the notification was created",
    },
  },
  {
    tableName: "notifications",
    timestamps: false,
  }
);

module.exports = Notifications;
