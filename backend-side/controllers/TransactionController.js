const Transaction = require('../models/transactions');
const Account = require('../models/accounts');
const Categories = require('../models/category');
const Subcategories = require('../models/subcategories');
const Notification = require('../models/notifications');
const Budget = require('../models/budgets');
const { Op } = require('sequelize');

class TransactionController {
  static async createTransaction(req, res) {
    try {
      const { user_id, account_id, category_id, subcategory_id, type, amount, description } = req.body;
  
      // Validate required fields
      if (!user_id || !account_id || !category_id || !type || !amount) {
        return res.status(400).json({
          error: "Missing required fields: user_id, account_id, category_id, type, and amount are required.",
        });
      }

      // Create the transaction with date_transaction
      const transaction = await Transaction.create({
        user_id,
        account_id,
        category_id,
        subcategory_id,
        type,
        amount,
        description,
        date_transaction: new Date(),
      });

      // Fetch the associated account
      const account = await Account.findByPk(account_id);
      if (!account) {
        return res.status(404).json({ error: "Account not found." });
      }

      // Update the account balance
      const newBalance =
        type === "Income"
          ? Number(account.balance) + Number(amount)
          : Number(account.balance) - Number(amount);
  
      await account.update({ balance: newBalance });

      // Check budget limits if it's an expense
      if (type === "Expense") {
        await TransactionController.checkBudgetLimits(user_id, category_id, amount);
      }

      // Respond with success
      return res.status(201).json({
        message: "Transaction created and account balance updated successfully.",
        transaction: {
          id: transaction.id,
          user_id: transaction.user_id,
          account_id: transaction.account_id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          date_transaction: transaction.date_transaction,
        },
        account: {
          id: account.id,
          new_balance: newBalance,
        },
      });
    } catch (error) {
      // Handle errors and provide meaningful feedback
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: "Validation error",
          details: error.errors.map((err) => err.message),
        });
      }
      console.error("Error creating transaction:", error); 
      return res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
        details: error.message,
      });
    }
  }

  static async checkBudgetLimits(user_id, category_id, amount) {
    const budget = await Budget.findOne({
      where: {
        category_id,
        user_id,
        date_start: { [Op.lte]: new Date() },
        end_date: { [Op.gte]: new Date() }
      }
    });

    if (budget) {
      const newSpendings = Number(budget.current_spendings) + Number(amount);
      await budget.update({ current_spendings: newSpendings });

      if (newSpendings > budget.amount) {
        await Notification.create({
          user_id,
          message: `Budget limit exceeded for category ${category_id}. Budget: ${budget.amount} ${budget.currency}, Current spending: ${newSpendings} ${budget.currency}`,
        });
      }
    }
  }

  static async getAccountTransactions(req, res) {
    try {
      const { account_id } = req.params;
      const { startDate, endDate, type, category_id } = req.query;
  
      if (!account_id) {
        return res.status(400).json({ error: "Account ID is required." });
      }
  
      const whereClause = { account_id };
  
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
  
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return res.status(400).json({
            error: "Invalid date format. Please provide valid 'startDate' and 'endDate'.",
          });
        }
  
        whereClause.date_transaction = { 
          [Op.between]: [start, end],
        };
      }
  
      if (type) {
        if (!['Income', 'Expense'].includes(type)) {
          return res.status(400).json({
            error: "Invalid 'type'. Allowed values are 'Income' or 'Expense'.",
          });
        }
        whereClause.type = type;
      }
  
      if (category_id) {
        if (isNaN(category_id)) {
          return res.status(400).json({
            error: "'category_id' must be a valid numeric value.",
          });
        }
        whereClause.category_id = category_id;
      }
  
      const transactions = await Transaction.findAll({
        where: whereClause,
        include: [
          { model: Categories, as: 'category', attributes: ['id', 'name'] },
          { model: Subcategories, as: 'subcategory', attributes: ['id', 'name'] },
        ],
        order: [['date_transaction', 'DESC']],
      });
  
      if (transactions.length === 0) {
        return res.status(404).json({
          message: "No transactions found for the specified criteria.",
        });
      }
  
      res.status(200).json({
        message: "Transactions retrieved successfully.",
        transactions,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error); 
      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
        details: error.message,
      });
    }
  }
  
  static async generateReport(req, res) {
    try {
      const { startDate, endDate, account_id } = req.query;
      
      const whereClause = {};
      if (account_id) whereClause.account_id = account_id;
      if (startDate && endDate) {
        whereClause.date_transaction = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const transactions = await Transaction.findAll({
        where: whereClause,
        include: [
          { model: Categories, as: 'category' },
          { model: Subcategories, as: 'subcategory' },
          { model: Account, as: 'Account' } 
        ],
        order: [['date_transaction', 'ASC']]
      });

      const summary = {
        totalIncome: 0,
        totalExpense: 0,
        categoryBreakdown: {},
        dailyTotals: {}
      };

      transactions.forEach(transaction => {
        if (transaction.type === 'Income') {
          summary.totalIncome += Number(transaction.amount);
        } else {
          summary.totalExpense += Number(transaction.amount);
        }

        const categoryName = transaction.category.name;
        if (!summary.categoryBreakdown[categoryName]) {
          summary.categoryBreakdown[categoryName] = 0;
        }
        summary.categoryBreakdown[categoryName] += Number(transaction.amount);

        const date = transaction.date_transaction.toISOString().split('T')[0];
        if (!summary.dailyTotals[date]) {
          summary.dailyTotals[date] = { income: 0, expense: 0 };
        }
        if (transaction.type === 'Income') {
          summary.dailyTotals[date].income += Number(transaction.amount);
        } else {
          summary.dailyTotals[date].expense += Number(transaction.amount);
        }
      });

      res.json({
        summary,
        transactions
      });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ 
        error: "An unexpected error occurred while generating the report.",
        details: error.message 
      });
    }
  }
}

module.exports = TransactionController;