const Accounts = require('../models/accounts');
const { Op } = require('sequelize');

// Helper function for common error responses
const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).json({
    success: false,
    message: 'An error occurred while processing your request',
    error: error.message
  });
};

// Validation helper
const validateAccountDetails = (data) => {
  const errors = [];
  
  if (!data.user_id) errors.push('User ID is required');
  if (!data.name) errors.push('Account name is required');
  if (!data.type || !['bank', 'mobile_money', 'cash', 'other'].includes(data.type)) {
    errors.push('Valid account type is required (bank, mobile_money, cash, or other)');
  }
  if (data.currency && !['RWF', 'USD', 'EUR'].includes(data.currency)) {
    errors.push('Currency must be RWF, USD, or EUR');
  }
  if (data.balance && isNaN(parseFloat(data.balance))) {
    errors.push('Balance must be a valid number');
  }

  return errors;
};

const AccountController = {
  // Create a new account
  async create(req, res) {
    try {
      const validationErrors = validateAccountDetails(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      const account = await Accounts.create({
        user_id: req.body.user_id,
        name: req.body.name,
        type: req.body.type,
        balance: req.body.balance || 0.0,
        currency: req.body.currency || 'RWF'
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: account
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  // Get all accounts with optional filtering
  async getAll(req, res) {
    try {
      const { user_id, type, currency } = req.query;
      const where = {};

      if (user_id) where.user_id = user_id;
      if (type) where.type = type;
      if (currency) where.currency = currency;

      const accounts = await Accounts.findAll({
        where,
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        message: 'Accounts retrieved successfully',
        data: accounts
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  // Get a single account by ID
  async getById(req, res) {
    try {
      const account = await Accounts.findByPk(req.params.id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Account retrieved By Id successfully',
        data: account
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  // Update an account
  async update(req, res) {
    try {
      const account = await Accounts.findByPk(req.params.id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      const validationErrors = validateAccountDetails(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validationErrors
        });
      }

      await account.update({
        name: req.body.name,
        type: req.body.type,
        balance: req.body.balance,
        currency: req.body.currency
      });

      return res.status(200).json({
        success: true,
        message: 'Account updated successfully',
        data: account
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  // Delete an account
  async delete(req, res) {
    try {
      const account = await Accounts.findByPk(req.params.id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      await account.destroy();

      return res.status(200).json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      return handleError(res, error);
    }
  },
  // Update account balance
  async updateBalance(req, res) {
    try {
      const { amount, operation } = req.body;
      const account = await Accounts.findByPk(req.params.id);
      
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found'
        });
      }

      if (!amount || isNaN(parseFloat(amount))) {
        return res.status(400).json({
          success: false,
          message: 'Valid amount is required'
        });
      }

      let newBalance;
      switch (operation) {
        case 'add':
          newBalance = parseFloat(account.balance) + parseFloat(amount);
          break;
        case 'subtract':
          newBalance = parseFloat(account.balance) - parseFloat(amount);
          if (newBalance < 0) {
            return res.status(400).json({
              success: false,
              message: 'Insufficient funds'
            });
          }
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid operation. Use "add" or "subtract"'
          });
      }

      await account.update({ balance: newBalance });

      return res.status(200).json({
        success: true,
        message: 'Balance updated successfully',
        data: {
          previous_balance: parseFloat(account.balance),
          new_balance: newBalance,
          operation,
          amount
        }
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
};

module.exports = AccountController;