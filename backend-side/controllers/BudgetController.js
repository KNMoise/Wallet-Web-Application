
const budgets = require('../models/Budgets');


  // Create a new budget
  const createBudget = async (req, res, next) => {

    try {
      const { user_id, category_id, amount, currency, period, date_start, end_date } = req.body;
      
      const budget = await budgets.create({
        user_id,
        category_id,
        amount,
        currency,
        period,
        date_start,
        end_date,
        current_spendings: 0
      });

      res.status(201).json(budget, { success:true, message: 'Budget has successful Created'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get all budgets for a user
  const getUserBudgets = async(req, res) => {
    try {
      const { user_id } = req.params;
      
      const budgets = await budgets.findAll({
        where: { user_id },
        include: [{ model: categories }]
      });

      res.json(budgets, {success:true, message: 'Budget retrieved Successfully'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  createBudget,
  getUserBudgets
};
