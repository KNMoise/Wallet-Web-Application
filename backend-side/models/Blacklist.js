const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');
const User = require('./users');

const Blacklist = sequelize.define('Blacklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    }
  }
}, {
  tableName: 'blacklisted_tokens',
  timestamps: true
});

// Define relationship
Blacklist.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = Blacklist;