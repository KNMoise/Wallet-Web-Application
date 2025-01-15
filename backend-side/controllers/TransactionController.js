// controllers/TransactionController.js
const { Transactions, Accounts, Categories, Subcategories, Notifications, Budgets } = require('../models');
const { Op } = require('sequelize');

class TransactionController {
  // Create a new transaction
  async createTransaction(req, res) {
    try {
      const { account_id, category_id, subcategory_id, type, amount, description } = req.body;
      
      // Start transaction
      const transaction = await Transactions.create({
        account_id,
        category_id,
        subcategory_id,
        type,
        amount,
        description,
        date: new Date()
      });

      // Update account balance
      const account = await Accounts.findByPk(account_id);
      const newBalance = type === 'Income' 
        ? Number(account.balance) + Number(amount)
        : Number(account.balance) - Number(amount);
      
      await account.update({ balance: newBalance });

      // Check budget limits if it's an expense
      if (type === 'Expense') {
        await this.checkBudgetLimits(category_id, amount);
      }

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Check budget limits and create notifications if exceeded
  async checkBudgetLimits(category_id, amount) {
    const budget = await Budgets.findOne({
      where: {
        category_id,
        date_start: { [Op.lte]: new Date() },
        end_date: { [Op.gte]: new Date() }
      }
    });

    if (budget) {
      const newSpendings = Number(budget.current_spendings) + Number(amount);
      await budget.update({ current_spendings: newSpendings });

      if (newSpendings > budget.amount) {
        await Notifications.create({
          user_id: budget.user_id,
          message: `Budget limit exceeded for category ${category_id}. Budget: ${budget.amount} ${budget.currency}, Current spending: ${newSpendings} ${budget.currency}`,
        });
      }
    }
  }

  // Get transactions by account with filtering
  async getAccountTransactions(req, res) {
    try {
      const { account_id } = req.params;
      const { startDate, endDate, type, category_id } = req.query;

      const whereClause = { account_id };
      
      if (startDate && endDate) {
        whereClause.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      
      if (type) whereClause.type = type;
      if (category_id) whereClause.category_id = category_id;

      const transactions = await Transactions.findAll({
        where: whereClause,
        include: [
          { model: Categories },
          { model: Subcategories }
        ],
        order: [['date', 'DESC']]
      });

      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Generate transaction report
  async generateReport(req, res) {
    try {
      const { startDate, endDate, account_id } = req.query;
      
      const whereClause = {};
      if (account_id) whereClause.account_id = account_id;
      if (startDate && endDate) {
        whereClause.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const transactions = await Transactions.findAll({
        where: whereClause,
        include: [
          { model: Categories },
          { model: Subcategories },
          { model: Accounts }
        ],
        order: [['date', 'ASC']]
      });

      // Calculate summaries
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

        // Category breakdown
        const categoryName = transaction.Category.name;
        if (!summary.categoryBreakdown[categoryName]) {
          summary.categoryBreakdown[categoryName] = 0;
        }
        summary.categoryBreakdown[categoryName] += Number(transaction.amount);

        // Daily totals
        const date = transaction.date.toISOString().split('T')[0];
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
      res.status(500).json({ error: error.message });
    }
  }
}


module.exports = TransactionController;